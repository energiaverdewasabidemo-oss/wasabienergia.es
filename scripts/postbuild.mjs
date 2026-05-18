// Postbuild: genera HTML por ruta a partir de dist/index.html con meta tags propios.
//
// Esto NO es prerender completo (no inyecta el árbol React renderizado), pero:
//   - Cada ruta tiene su propio <title>, description, canonical, OG
//   - Crawlers que no ejecutan JS (FB scraper, LinkedIn, X, Pinterest) ven meta correctas
//   - Google indexa cada URL como página separada en lugar de duplicate content
//   - Lighthouse por ruta refleja el SEO real de esa ruta
//
// El cuerpo lo sigue rehidratando React en cliente (hydrateRoot).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const SITE_URL = 'https://wasabienergia.es';
const OG_IMAGE = `${SITE_URL}/wasabi-logo-main.png`;

const routes = [
  {
    path: '/',
    title: 'Energía Verde Wasabi — Renovable Sin Trampas | Hasta 120€/año',
    description: 'Cambia a luz y gas 100% renovable sin permanencia. Hasta 120€/año de ahorro. Atención humana, precios justos. ¡Cambia ya!',
  },
  {
    path: '/subir-factura',
    title: 'Sube tu factura y calcula tu ahorro real | Wasabi Energía',
    description: 'Sube tu factura de luz o gas y te decimos cuánto puedes ahorrar al cambiarte a Wasabi. Sin compromiso, respuesta en minutos.',
  },
  {
    path: '/afiliados/login',
    title: 'Acceso colaboradores | Wasabi Energía',
    description: 'Panel privado para colaboradores afiliados de Wasabi Energía.',
    noindex: true,
  },
  {
    path: '/afiliados/registro',
    title: 'Registro de colaboradores | Wasabi Energía',
    description: 'Únete al programa de colaboradores afiliados de Wasabi Energía.',
    noindex: true,
  },
];

const escape = (s) => s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const buildHtml = (template, route) => {
  const canonical = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  const t = escape(route.title);
  const d = escape(route.description);

  let html = template;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);

  // description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${d}" />`
  );

  // og:title / og:description / og:url / twitter:*
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${t}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${d}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${t}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${d}" />`);

  // Inyecta canonical + (opcional) noindex justo después de <meta name="viewport">
  const extra = [`<link rel="canonical" href="${canonical}" />`];
  if (route.noindex) extra.push('<meta name="robots" content="noindex, nofollow" />');
  html = html.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n    ${extra.join('\n    ')}`);

  return html;
};

const writeRoute = async (template, route) => {
  const outPath = route.path === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route.path.replace(/^\//, ''), 'index.html');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  const html = buildHtml(template, route);
  await fs.writeFile(outPath, html, 'utf8');
  console.log(`  ✓ ${route.path.padEnd(28)} → ${path.relative(DIST, outPath)}`);
};

const main = async () => {
  console.log('postbuild: generando HTML por ruta');
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  for (const route of routes) {
    await writeRoute(template, route);
  }
  console.log('postbuild: hecho');
};

main().catch((err) => {
  console.error('postbuild falló:', err);
  process.exit(1);
});
