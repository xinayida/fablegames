#!/usr/bin/env node
/**
 * Awesome Fable 5.2 Games - XML Sitemap Generator (Node.js)
 * Automatically parses js/games-data.js and generates sitemap.xml.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://fablegames.live';
const BASE_DIR = path.resolve(__dirname, '..');
const GAMES_DATA_PATH = path.join(BASE_DIR, 'js', 'games-data.js');
const SITEMAP_OUTPUT_PATH = path.join(BASE_DIR, 'sitemap.xml');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function main() {
  console.log(`[*] Reading games data from: ${GAMES_DATA_PATH}`);
  const gamesData = require(GAMES_DATA_PATH);
  const games = gamesData.getAll();
  console.log(`[+] Found ${games.length} games registered.`);

  const today = new Date().toISOString().split('T')[0];
  const allDates = games.map(g => g.releaseDate).filter(Boolean);
  const latestDate = allDates.length > 0 ? allDates.sort().reverse()[0] : today;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // 1. Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${SITE_URL}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/?lang=zh"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/?lang=en"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>\n`;
  games.slice(0, 4).forEach(g => {
    if (g.cover) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${SITE_URL}/${escapeXml(g.cover)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(g.title)}</image:title>\n`;
      if (g.summary) xml += `      <image:caption>${escapeXml(g.summary)}</image:caption>\n`;
      xml += `    </image:image>\n`;
    }
  });
  xml += `  </url>\n`;

  // 2. Standalone Games
  games.forEach(g => {
    if (g.fileUrl && g.fileUrl.startsWith('games/')) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/${escapeXml(g.fileUrl)}</loc>\n`;
      xml += `    <lastmod>${g.releaseDate || today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      if (g.cover) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${SITE_URL}/${escapeXml(g.cover)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(g.title)}</image:title>\n`;
        if (g.summary) xml += `      <image:caption>${escapeXml(g.summary)}</image:caption>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }
  });

  // NOTE: Portal Play Pages (/?game=id, 60 URLs) and Category Pages
  // (/#/category/*, 7 URLs) are intentionally NOT in the sitemap.
  // index.html carries a single static canonical (https://fablegames.live/),
  // so every /?game= URL canonicalizes to the homepage, and # fragments
  // are never separate crawlable URLs. Listing them made Ahrefs flag
  // "Non-canonical page in sitemap" on exactly those 67 URLs (2026-11-13
  // crawl, Health Score 60). A sitemap must contain canonical URLs only:
  // homepage + the 18 standalone /games/*.html pages below. The 42 games
  // without a standalone file lose no indexability — they were never
  // indexable as separate URLs and remain discoverable via the homepage.

  xml += `</urlset>\n`;

  fs.writeFileSync(SITEMAP_OUTPUT_PATH, xml, 'utf8');
  console.log(`[SUCCESS] Sitemap successfully generated at: ${SITEMAP_OUTPUT_PATH}`);
}

main();
