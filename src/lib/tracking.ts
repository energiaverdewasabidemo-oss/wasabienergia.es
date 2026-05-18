declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

const GTM_ID = 'GTM-MDR8HB33';
// Pixel real activo (dataset "Energía Verde 2026" en Events Manager).
// El ID 2145914676207230 que figuraba en index.html era legacy y nunca recibió eventos.
// Sirve también a luzia.pro (multi-dominio en la misma cuenta Wasabi).
export const PIXEL_ID = '2030026287870740';

let loaded = false;

const loadGTM = (): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
};

const loadMetaPixel = (): void => {
  const f = window;
  if (f.fbq) {
    f.fbq('init', PIXEL_ID);
    f.fbq('track', 'PageView');
    return;
  }
  const n = function (...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
  } as Window['fbq'] & { callMethod?: unknown; queue: unknown[] };
  f.fbq = n;
  f._fbq = f._fbq || n;
  n.queue = [];
  n.loaded = true;
  n.version = '2.0';

  const t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(t);

  f.fbq('init', PIXEL_ID);
  f.fbq('track', 'PageView');
};

const registerLinkClickCAPI = (): void => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const link = target.closest('a') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.href || '';
    if (!href.startsWith('tel:') && !href.startsWith('https://wa.me') && !href.includes('whatsapp')) return;

    fetch('/.netlify/functions/meta-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventSourceUrl: window.location.href,
        clientUserAgent: navigator.userAgent,
        fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1] || null,
        fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1] || null,
      }),
    }).catch(() => {});
  });
};

export const initTracking = (): void => {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  loadGTM();
  loadMetaPixel();
  registerLinkClickCAPI();
};
