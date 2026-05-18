// POST /.netlify/functions/lead
//
// Recibe un lead desde el form de wasabienergia.es y hace:
//  1. INSERT en tabla `leads` de Supabase (fuente de verdad)
//  2. POST a Meta CAPI con event_name='Lead' (server-side, deduplicado con fbq via eventId)
//
// Las dos llamadas se ejecutan en paralelo. La función responde 200 incluso si CAPI
// falla — no bloquea la conversión del usuario por un fallo de tracking.
//
// Env vars requeridas (Netlify dashboard → Site settings → Environment variables):
//   META_PIXEL_ID      = 2145914676207230
//   META_ACCESS_TOKEN  = (Meta Conversions API token)
//   SUPABASE_URL       = https://<ref>.supabase.co
//   SUPABASE_ANON_KEY  = (anon key)

const crypto = require('crypto');

const sha256 = (s) => crypto.createHash('sha256').update(String(s).toLowerCase().trim()).digest('hex');

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_json' }) };
  }

  const {
    nombre,
    telefono,
    email,
    supplyType,
    clientType,
    codigoPostal,
    cups,
    eventId,
    fbp,
    fbc,
    eventSourceUrl,
    userAgent,
  } = body;

  // Validación mínima
  if (!nombre || !telefono) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'missing_fields', detail: 'nombre y telefono son obligatorios' }),
    };
  }

  const clientIp =
    (event.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    event.headers['client-ip'] ||
    null;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  // ----- 1. Supabase INSERT en tabla `leads` -----
  const supaPromise = (async () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return { ok: false, reason: 'supabase_env_missing' };
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          nombre,
          telefono,
          email: email || 'sin-email@wasabienergia.es',
          codigo_postal: codigoPostal || '00000',
          cups: cups || null,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, reason: `supabase_${res.status}`, detail: text.slice(0, 200) };
      }
      const json = await res.json();
      return { ok: true, lead_id: Array.isArray(json) && json[0] ? json[0].id : null };
    } catch (err) {
      return { ok: false, reason: 'supabase_fetch_error', detail: err && err.message ? err.message : String(err) };
    }
  })();

  // ----- 2. Meta CAPI Lead event -----
  const capiPromise = (async () => {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return { ok: false, reason: 'meta_env_missing' };
    }
    try {
      const phoneDigits = String(telefono).replace(/[^0-9]/g, '');
      const phoneE164 = phoneDigits.startsWith('34') ? phoneDigits : `34${phoneDigits}`;
      const firstName = String(nombre).trim().split(/\s+/)[0];

      const user_data = {
        client_ip_address: clientIp,
        client_user_agent: userAgent || null,
        fbp: fbp || null,
        fbc: fbc || null,
      };
      if (email) user_data.em = [sha256(email)];
      if (phoneE164) user_data.ph = [sha256(phoneE164)];
      if (firstName) user_data.fn = [sha256(firstName)];

      const payload = {
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId || crypto.randomUUID(),
            action_source: 'website',
            event_source_url: eventSourceUrl || 'https://wasabienergia.es',
            user_data,
            custom_data: {
              content_name: 'Energy Lead',
              content_category: clientType || 'residencial',
              currency: 'EUR',
              value: 0,
              supply_type: Array.isArray(supplyType) ? supplyType.join(',') : (supplyType || ''),
            },
          },
        ],
      };

      const res = await fetch(
        `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!res.ok) return { ok: false, reason: `meta_${res.status}`, detail: result };
      return { ok: true, result };
    } catch (err) {
      return { ok: false, reason: 'meta_fetch_error', detail: err && err.message ? err.message : String(err) };
    }
  })();

  const [supa, capi] = await Promise.allSettled([supaPromise, capiPromise]);

  const supaOut = supa.status === 'fulfilled' ? supa.value : { ok: false, reason: 'supa_rejected' };
  const capiOut = capi.status === 'fulfilled' ? capi.value : { ok: false, reason: 'capi_rejected' };

  if (!supaOut.ok && !capiOut.ok) {
    console.error('lead.js: ambos paths fallaron', { supaOut, capiOut });
  } else if (!supaOut.ok) {
    console.error('lead.js: supabase falló', supaOut);
  } else if (!capiOut.ok) {
    console.error('lead.js: capi falló', capiOut);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      success: supaOut.ok || capiOut.ok,
      supabase: supaOut.ok,
      capi: capiOut.ok,
      lead_id: supaOut.lead_id || null,
    }),
  };
};
