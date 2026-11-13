#!/usr/bin/env node
/**
 * Awesome Fable 5.2 Games - LLMs.txt Generator (Node.js)
 * Generates /llms.txt compliant with the llmstxt.org standard,
 * providing comprehensive machine-readable context for AI models, agents, and search engines.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://fablegames.live';
const BASE_DIR = path.resolve(__dirname, '..');
const GAMES_DATA_PATH = path.join(BASE_DIR, 'js', 'games-data.js');
const LLMSTXT_OUTPUT_PATH = path.join(BASE_DIR, 'llms.txt');

function main() {
  console.log(`[*] Generating llms.txt from: ${GAMES_DATA_PATH}`);
  const gamesData = require(GAMES_DATA_PATH);
  const games = gamesData.getAll();
  console.log(`[+] Total games registered: ${games.length}`);

  const featuredGames = games.filter(g => g.featured);
  const categoriesMap = new Map();
  games.forEach(g => {
    const cat = g.categoryEn || g.category;
    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, []);
    }
    categoriesMap.get(cat).push(g);
  });

  let content = `# Awesome Fable 5.2 Games

> The world's premier web game portal showcasing games 100% crafted & coded end-to-end by Claude Fable 5.2. Instant play directly in any modern browser with zero installation, zero latency, and silky 60FPS WebGL / HTML5 performance.

Awesome Fable 5.2 Games is a curated next-generation gaming hub celebrating the autonomous software engineering capabilities of Anthropic's Claude Fable 5.2. The platform aggregates ${games.length} verified web mini-games spanning 3A open-world exploration, realistic 3D racing, competitive FPS combat, dungeon RPGs, nostalgic retro arcades, and calming indie simulations. Every single title in this catalog was conceived, programmed, and debugged without manual code intervention.

## Platform Metadata
- Platform Name: Awesome Fable 5.2 Games
- Live Production URL: ${SITE_URL}/
- Open Source Repository: https://github.com/xinayida/fablegames
- Total Verified Games: ${games.length}
- Primary AI Engine: Claude Fable 5.2 (Anthropic)
- Core Runtime Architecture: Pure Client-Side WebGL, Three.js, Canvas2D, WebAudio, Vanilla ES6+
- Deployment: Zero-backend, edge-hosted on Vercel
- Licensing: MIT Open Source License

## Key Features & Highlights
- **100% Claude Fable 5.2 Generated**: All source files and game mechanics were created end-to-end by Claude Fable 5.2.
- **Zero Install, Instant Play**: Direct browser execution in sandboxed iframes or full-screen isolated tabs.
- **High-Fidelity 3D Graphics**: Advanced shader illumination, raymarching, volumetric fog, dynamic lighting, and particle effects running natively in WebGL.
- **Bilingual Interface**: Full internationalization supporting both Simplified Chinese (zh-CN) and English (en).
- **Embedded Arena Player**: Built-in theater mode, hardware fullscreen, reload controls, keybinding cheatsheets, and one-click GitHub source inspection.

## Game Categories
`;

  categoriesMap.forEach((gList, cat) => {
    const slug = gList[0].categoryId || 'all';
    content += `- [${cat}](${SITE_URL}/#/category/${slug}): ${gList.length} games available.\n`;
  });

  content += `\n## Featured Games\n\n`;

  featuredGames.forEach(g => {
    const title = g.titleEn || g.title;
    const summary = g.summaryEn || g.summary;
    const directUrl = `${SITE_URL}/?game=${g.id}`;
    const playUrl = g.fileUrl && g.fileUrl.startsWith('games/') ? `${SITE_URL}/${g.fileUrl}` : g.fileUrl;
    content += `### [${title}](${directUrl})\n`;
    content += `- **Category**: ${g.categoryEn || g.category} (★ ${g.rating || '4.8'})\n`;
    content += `- **Summary**: ${summary}\n`;
    content += `- **Direct Play**: [Launch Arena](${directUrl}) | [Source File](${playUrl})\n`;
    if (g.githubUrl) {
      content += `- **GitHub Repository**: ${g.githubUrl}\n`;
    }
    content += `\n`;
  });

  content += `## Complete Games Catalog (${games.length} Games)\n\n`;

  games.forEach((g, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const title = g.titleEn ? `${g.title} (${g.titleEn})` : g.title;
    const summary = g.summaryEn || g.summary;
    const directUrl = `${SITE_URL}/?game=${g.id}`;
    const author = g.developerEn || g.developer || 'Claude Fable 5.2 Studio';
    content += `${num}. **[${title}](${directUrl})**\n`;
    content += `   - **Category**: ${g.categoryEn || g.category} | **Developer/Credit**: ${author}\n`;
    content += `   - **Description**: ${summary}\n`;
    content += `   - **URL**: ${directUrl}\n\n`;
  });

  content += `## Machine-Readable Resources & Developer Links
- [Sitemap XML](${SITE_URL}/sitemap.xml): Machine-readable index of all homepage, game arena, and standalone files.
- [Robots.txt](${SITE_URL}/robots.txt): Crawler directives and search engine permission policies.
- [How to Add Games](https://github.com/xinayida/fablegames/blob/main/HOW_TO_ADD_GAMES.md): Complete guide for contributing and registering new Claude Fable 5.2 games.
- [GitHub Repository](https://github.com/xinayida/fablegames): Full open source project repository with assets, covers, and gameplay recordings.
`;

  fs.writeFileSync(LLMSTXT_OUTPUT_PATH, content, 'utf8');
  console.log(`[SUCCESS] llms.txt successfully generated at: ${LLMSTXT_OUTPUT_PATH}`);
}

main();
