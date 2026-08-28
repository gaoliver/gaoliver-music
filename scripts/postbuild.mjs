import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITEMAP_PATHS } from '../site-routes.mjs';

const clientDirectory = resolve('build/client');
const renderedNotFound = resolve(clientDirectory, '404/index.html');
const githubPagesNotFound = resolve(clientDirectory, '404.html');

if (!existsSync(renderedNotFound)) {
  throw new Error(`Missing pre-rendered not-found page: ${renderedNotFound}`);
}

copyFileSync(renderedNotFound, githubPagesNotFound);

const productionUrl = 'https://gaoliver-music.com';
const sitemapEntries = SITEMAP_PATHS.map((path) => (
  `  <url><loc>${productionUrl}${path === '/' ? '/' : path}</loc></url>`
)).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
writeFileSync(resolve(clientDirectory, 'sitemap.xml'), sitemap);
