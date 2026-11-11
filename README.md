# 🎮 FableGames · 潮玩网页微游戏聚合站

> 参考 **CrazyGames.com** 现代暗黑霓虹视觉与交互风格打造的高性能网页小游戏聚合门户，支持即点即玩、多语言（中英文）切换、独立游戏竞技场、本地持久化收藏与极简扩展。

🔗 **GitHub 仓库**：[https://github.com/xinayida/fablegames](https://github.com/xinayida/fablegames)

---

## ⚡ 本地极速启动 (Quick Start)

由于现代浏览器（Chrome、Edge、Safari）对本地 `file://` 协议存在严格的跨域与存储限制（可能会阻断 iframe 内游戏的音频、WebGL 资源及 LocalStorage），**推荐使用任意轻量级静态服务在本地启动**：

### 方式一：使用 Python（macOS / Linux / Windows 自带，最推荐 🌟）

打开终端，进入项目目录直接运行：

```bash
python3 -m http.server 8080
```
> 打开浏览器访问 👉 **[http://localhost:8080](http://localhost:8080)** 即可即刻畅玩！

---

### 方式二：使用 Node.js / npm

如果你安装了 Node.js，直接运行：

```bash
# 免安装全局包直接启动
npx serve -l 8080 .

# 或通过 package.json 脚本启动
npm start
```

---

### 方式三：使用 VS Code / Cursor 插件

如果你在编辑器中打开了本项目：
1. 安装 **Live Server** 插件。
2. 在 `index.html` 上右键，点击 **「Open with Live Server」** 即可。

---

## 🕹️ 当前已集成的精选游戏阵容

| 游戏名称 | 英文名称 | 分类 | 游玩方式 | 亮点说明 |
| :--- | :--- | :--- | :--- | :--- |
| **Saltline (盐线)** | Saltline: 3A Web FPS | 动作射击 | 本地离线 | Anthropic Claude 全自动生成的写实光影码头 3A 第一人称射击 |
| **QQ飞车 3D** | QQ Speed 3D: Drift Racing | 竞速漂移 | 本地离线 | 经典还原11城/爱琴海赛道、贴墙漂移、双喷、道具赛 |
| **穿越火线 · 运输船 3D** | CrossFire: Transport Ship 3D | 动作射击 | 本地离线 | 经典运输船 1:1 还原，保卫者 vs 潜伏者，智能 BOT 团队对战 |
| **鹈鹕骑单车** | Pelican on a Bike | 休闲治愈 | 本地离线 | 唯美落日海岸追鱼漫游、IK骨骼动画与治愈合成器音乐 |
| **黑神话 · 悟空 (天命人)** | Black Myth: Wukong | 3A冒险 | 云端嵌入 | 网页三维西游动作 RPG，行云流水识破劈棍、定身法与闪避 |
| **黑神话 · 关羽** | Black Myth: Guan Yu | 3A冒险 | 云端嵌入 | 三国武圣硬核冷兵器格斗，青龙偃月刀破阵连击 |
| **英雄联盟 · 海克斯大乱斗** | League of Legends: Hextech ARAM | 角色扮演 | 云端嵌入 | 嚎哭深渊极地推塔、亚索/金克丝招牌技能、海克斯符文三选一 |
| **元素法师** | Elemental Mage: Fire & Lightning | 动作射击 | 本地离线 | 烈火轰炸、连锁闪电与极寒冰锥，多系法术爽快割草 |

---

## ✨ 核心功能与亮点

- 🎨 **CrazyGames 沉浸式暗黑霓虹风格**：深邃蓝黑底色、霓虹紫/青光效、卡片流光边框、水波纹与 3D 微动效。
- 🔍 **全局实时搜索与过滤**：支持中英文标题、拼音、标签检索，支持 `/` 或 `Ctrl+K` 快速呼出。
- 🌐 **双语多语言系统**：顶栏一键切换中/英文，游戏元数据、操作指南与全站 UI 丝滑本地化。
- 🏟️ **独立竞技场播放器 (Game Arena)**：
  - 剧场模式 (Theater Mode)、原生全屏 (Fullscreen API)、重置刷新。
  - **独立新窗口打开 (`↗️ 独立窗口`)**：支持跳脱 iframe 并在全屏独立标签页中运行。
  - **清晰按键指南**：WASD、方向键、鼠标技能一目了然。
  - **无残留路由**：采用 `location.replace` 优化，点击浏览器“后退”平滑返回大厅，不污染浏览历史。
- 💾 **本地持久化存储 (LocalStorage)**：自动同步我的收藏、游玩记录与游戏点赞数。
- 🚀 **Vercel / GitHub Pages 一键部署**：预置 `vercel.json` 规则，无需后端或构建脚本，开箱即用。

---

## ➕ 如何在 1 分钟内添加新游戏？

详细步骤请参考 [`HOW_TO_ADD_GAMES.md`](file:///Users/wangwei/workspace/project/fablegames/HOW_TO_ADD_GAMES.md)：
1. 将单文件 `.html` 游戏放入 `games/` 目录（或使用外部 HTTPS 游戏链接）。
2. 在 `js/games-data.js` 中追加一段游戏配置即可！

---

## 📄 开源许可

[MIT License](LICENSE)
