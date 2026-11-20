import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { projects } from '../src/data/projects.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const ssrAssets = join(root, '.ssr-build', 'assets');
const ssrFile = (await readdir(ssrAssets)).find(file => file.endsWith('.js'));
if (!ssrFile) throw new Error('SSR entry bundle was not produced');
const { render } = await import(pathToFileURL(join(ssrAssets, ssrFile)).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');
const published = projects.filter(project => !project.isUpcoming);
const pages = [
  { path: '/', title: 'True Inspire — Web Design & Development Studio in Odisha', description: 'True Inspire designs and builds websites and digital products for businesses, events, schools, and growing teams. Explore our work and start a project.' },
  { path: '/work/', title: 'Selected Work — True Inspire', description: 'Explore digital products, events, and applied systems designed and built by True Inspire and its collaborators.' },
  ...published.map(project => ({ path: `/work/${project.id}/`, title: `${project.title} — True Inspire Work`, description: `${project.subtitle}. ${project.collaboration}. Explore the project and its live or source links.` })),
  { path: '/services/', title: 'Website & Product Services — True Inspire', description: 'Websites for businesses, schools, and events; SaaS interfaces; and search and performance foundations by True Inspire.' },
  { path: '/studio/', title: 'Our Studio — True Inspire', description: 'Meet Chandan Mahapatra and S Akash Dora, the founders of True Inspire, an independent web design and development studio in Odisha.' },
  { path: '/contact/', title: 'Start a Project — True Inspire', description: 'Contact the True Inspire founders to discuss a website, digital product, event platform, or technical challenge.' },
  { path: '/privacy/', title: 'Privacy — True Inspire', description: 'Learn how True Inspire currently handles project-brief information and external contact links.' },
  { path: '/404.html', title: 'Page Not Found — True Inspire', description: 'Find your way back to True Inspire’s work, services, and studio.', noindex: true },
];
const configuredUrl = process.env.PUBLIC_SITE_URL?.trim();
const siteUrl = configuredUrl ? new URL(configuredUrl).origin.replace(/\/+$/, '') : '';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#business`,
      name: 'True Inspire',
      url: siteUrl,
      image: `${siteUrl}/assets/true-inspire-social-share.png`,
      logo: `${siteUrl}/assets/true-inspire-logo-blue-monogram-512.png`,
      description: 'Independent web design and development studio in Odisha, India.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Odisha, India' },
      address: { '@type': 'PostalAddress', addressRegion: 'Odisha', addressCountry: 'IN' },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'True Inspire',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#business` },
    },
  ],
};

for (const page of pages) {
  const route = page.path === '/404.html' ? '/not-found' : page.path;
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}" />`);
  const socialImage = siteUrl ? `${siteUrl}/assets/true-inspire-social-share.png` : '/assets/true-inspire-social-share.png';
  const social = `<meta property="og:type" content="website" /><meta property="og:site_name" content="True Inspire" /><meta property="og:title" content="${escape(page.title)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:image" content="${socialImage}" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(page.title)}" /><meta name="twitter:description" content="${escape(page.description)}" /><meta name="twitter:image" content="${socialImage}" />`;
  const canonical = siteUrl && !page.noindex ? `<link rel="canonical" href="${siteUrl}${page.path}" /><meta property="og:url" content="${siteUrl}${page.path}" />` : '';
  const schema = siteUrl && page.path === '/' ? `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>` : '';
  html = html.replace('</head>', `${social}${canonical}${schema}${page.noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}</head>`);
  const target = page.path === '/' ? join(dist, 'index.html') : page.path === '/404.html' ? join(dist, '404.html') : join(dist, page.path.slice(1), 'index.html');
  await mkdir(join(target, '..'), { recursive: true });
  await writeFile(target, html, 'utf8');
}

if (siteUrl) {
  const urls = pages.filter(page => !page.noindex).map(page => `<url><loc>${siteUrl}${page.path}</loc></url>`).join('');
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, 'utf8');
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
}

console.log(`Pre-rendered ${pages.length} pages${siteUrl ? ' and sitemap' : ' (canonical URLs await PUBLIC_SITE_URL)'}.`);
