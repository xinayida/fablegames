const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '../README.md');
const dataJsPath = path.join(__dirname, '../js/games-data.js');

const GAMES_DATA = require(dataJsPath);
const games = GAMES_DATA.games;

console.log('Generating table for games count:', games.length);

// 构造作者出处 Markdown
function formatAuthor(g) {
  // 原有经典项目的 GitHub 出处映射
  const legacyRepos = {
    'saltline': '[realcodebear](https://github.com/realcodebear/saltline-fable-5.2)',
    'doubao-dance-3d': '[riba2534](https://github.com/riba2534/claude-opus-5-5-demo)',
    'qq-speed-3d': '[riba2534](https://github.com/riba2534/claude-opus-5-5-demo)',
    'crossfire-ship-3d': '[riba2534](https://github.com/riba2534/claude-opus-5-5-demo)',
    'voxel-gta': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'frostline-kart': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'robo-tennis': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'rail-rush': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'crossy-farm': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'super-mario': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'hollowmere-sandbox': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'flappy-skies': '[sorrycc/fable-arcade](https://github.com/sorrycc/fable-arcade)',
    'vector-lunar': '[MiaAI-Lab](https://github.com/MiaAI-Lab/Claude-Fable-5.2-HTML-Files)',
    'sorrow-rock': '[MiaAI-Lab](https://github.com/MiaAI-Lab/Claude-Fable-5.2-HTML-Files)',
    'ariadne-thread': '[MiaAI-Lab](https://github.com/MiaAI-Lab/Claude-Fable-5.2-HTML-Files)',
    'safe-cracker': '[MiaAI-Lab](https://github.com/MiaAI-Lab/Claude-Fable-5.2-HTML-Files)',
    'gelato-stack': '[MiaAI-Lab](https://github.com/MiaAI-Lab/Claude-Fable-5.2-HTML-Files)',
    'pelican-bike': '[riba2534](https://github.com/riba2534/claude-opus-5-5-demo)',
    'black-myth-wukong': '[oneoyn](https://github.com/oneoyn)',
    'black-myth-guanyu': '[fablegames](https://github.com/xinayida/fablegames)',
    'lol-hextech-aram': '[hanyue](https://github.com/hanyue)',
    'elemental-mage': '[fablegames](https://github.com/xinayida/fablegames)'
  };

  if (legacyRepos[g.id]) {
    return legacyRepos[g.id];
  }

  // 新增游戏出处
  const authorName = (g.developer || '').replace(' (Claude Fable 5.2)', '').trim();
  const authorLink = g.githubUrl ? `[@${authorName}](${g.githubUrl})` : `@${authorName}`;
  const playLink = g.fileUrl ? ` · [体验](${g.fileUrl})` : '';
  return authorLink + playLink;
}

// 游玩方式判定
function formatMode(g) {
  if (g.fileUrl && (g.fileUrl.startsWith('http://') || g.fileUrl.startsWith('https://'))) {
    return '云端嵌入';
  }
  return '本地离线';
}

// 生成 Markdown 表格行
const rows = games.map(g => {
  const gifImg = `<img src="${g.gif}" width="140" alt="${g.title}">`;
  const title = `**${g.title}**`;
  const titleEn = g.titleEn;
  const category = g.category;
  const mode = formatMode(g);
  const author = formatAuthor(g);
  const summary = (g.summary || '').replace(/\|/g, '、');
  return `| ${gifImg} | ${title} | ${titleEn} | ${category} | ${mode} | ${author} | ${summary} |`;
});

const tableHeader = `| 游戏画面 | 游戏名称 | 英文名称 | 分类 | 游玩方式 | 作者 / 开源出处 | 亮点说明 |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |`;

const tableMarkdown = `${tableHeader}\n${rows.join('\n')}`;

// 读取原 README.md
let readmeContent = fs.readFileSync(readmePath, 'utf8');

const sectionStart = '## 🕹️ 精选游戏阵容与开源出处 (Featured Games & Credits)';
const sectionEnd = '## ✨ 核心功能与亮点';

const startIndex = readmeContent.indexOf(sectionStart);
if (startIndex === -1) {
  throw new Error(`Section start "${sectionStart}" not found in README.md`);
}

const endIndex = readmeContent.indexOf(sectionEnd, startIndex);
if (endIndex === -1) {
  throw new Error(`Section end "${sectionEnd}" not found in README.md`);
}

const newSection = `${sectionStart}

本平台汇聚由 **Claude Fable 5.2** 端到端全自动生成的次世代网页微游戏（当前共收录 **${games.length} 款** 精品游戏），所有游戏均保留原作者署名、开源仓库与在线体验出处：

${tableMarkdown}

---

`;

readmeContent = readmeContent.substring(0, startIndex) + newSection + readmeContent.substring(endIndex);

fs.writeFileSync(readmePath, readmeContent, 'utf8');
console.log(`Updated README.md with all ${games.length} games successfully!`);
