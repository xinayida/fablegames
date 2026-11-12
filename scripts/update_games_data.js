const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '../js/games-data.js');
const newGamesPath = path.join(__dirname, 'new_games.json');

// 1. 加载已有模块并提取当前游戏
const currentData = require(dataJsPath);
const existingGames = currentData.games.map(g => {
  // 确保已有游戏也具有统一的 gif 属性
  const copy = Object.assign({}, g);
  if (!copy.gif) {
    copy.gif = `assets/gifs/${g.id}.gif`;
  }
  return copy;
});

console.log('Existing games count:', existingGames.length);

// 2. 加载新游戏
const newGames = JSON.parse(fs.readFileSync(newGamesPath, 'utf8'));
console.log('New games count to add:', newGames.length);

// 检查去重
const existingIds = new Set(existingGames.map(g => g.id));
const gamesToAdd = [];
for (const ng of newGames) {
  if (existingIds.has(ng.id)) {
    console.warn(`Game ${ng.id} already exists, skipping.`);
  } else {
    gamesToAdd.push(ng);
    existingIds.add(ng.id);
  }
}

const allGames = existingGames.concat(gamesToAdd);
console.log('Total merged games count:', allGames.length);

// 3. 读取原文件内容
const originalContent = fs.readFileSync(dataJsPath, 'utf8');

// 找到 const GAMES = [ 的位置和结尾位置
const startMarker = '  const GAMES = [';
const startIndex = originalContent.indexOf(startMarker);
if (startIndex === -1) {
  throw new Error(`Start marker "${startMarker}" not found!`);
}

const endMarker = '  ];\n\n  /**\n   * Default Cover Image Fallback';
const endIndex = originalContent.indexOf(endMarker, startIndex);
if (endIndex === -1) {
  throw new Error(`End marker "${endMarker}" not found!`);
}

// 格式化 GAMES 数组为缩进美观的 JS 字符串
function formatGame(game) {
  const jsonStr = JSON.stringify(game, null, 4);
  // 为每一行添加 4 个额外空格的缩进
  const indented = jsonStr.split('\n').map((line, idx) => {
    return (idx === 0 ? '    ' : '    ') + line;
  }).join('\n');
  return indented;
}

const formattedGames = allGames.map(formatGame).join(',\n');
const replacement = `  const GAMES = [\n${formattedGames}\n  ];\n\n  /**\n   * Default Cover Image Fallback`;

const updatedContent = originalContent.substring(0, startIndex) + replacement + originalContent.substring(endIndex + endMarker.length);

fs.writeFileSync(dataJsPath, updatedContent, 'utf8');
console.log('Updated js/games-data.js successfully!');

// 验证重新 require
delete require.cache[require.resolve(dataJsPath)];
const reloaded = require(dataJsPath);
console.log('Verification: Reloaded games count =', reloaded.games.length);
if (reloaded.games.length !== allGames.length) {
  throw new Error('Verification failed: Game count mismatch!');
}
console.log('All verification passed!');
