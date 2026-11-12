# 🎮 FableGames · 潮玩网页微游戏聚合站

> 参考 **CrazyGames.com** 现代暗黑霓虹视觉与交互风格打造的高性能网页小游戏聚合门户，支持即点即玩、多语言（中英文）切换、独立游戏竞技场、本地持久化收藏与极简扩展。

🔗 **GitHub 仓库**：[https://github.com/xinayida/fablegames](https://github.com/xinayida/fablegames)

---

## ⚡ 本地极速启动 (Quick Start)

由于现代浏览器（Chrome、Edge、Safari）对本地 `file://` 协议存在严格的跨域与存储限制（可能会阻断 iframe 内游戏的音频、WebGL 资源及 LocalStorage），**推荐使用轻量级静态服务在本地启动**：

### 方式一：使用 Node.js / npx（推荐 🌟）

无需额外配置或全局安装，在项目根目录直接运行：

```bash
# 免安装直接启动轻量级静态服务器
npx serve -l 8080 .

# 或通过 package.json 脚本启动
npm start
# 或
npm run dev
```

> 打开浏览器访问 👉 **[http://localhost:8080](http://localhost:8080)** 即可即刻畅玩！

---

### 方式二：使用 VS Code / Cursor 插件

如果你在编辑器中打开了本项目：
1. 安装 **Live Server** 插件。
2. 在 `index.html` 上右键，点击 **「Open with Live Server」** 即可。

---

### 方式三：使用任意本地静态服务器

你也可以使用任何你熟悉的静态服务器工具（例如 `http-server` 等）：

```bash
# 使用 http-server
npx http-server -p 8080 -c-1 .
```

---

## 🕹️ 当前已集成的精选游戏阵容与开源出处

| 游戏名称 | 英文名称 | 分类 | 游玩方式 | 开源仓库 / 出处 GitHub | 亮点说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Saltline (盐线)** | Saltline: 3A Web FPS | 动作射击 | 云端嵌入 | [realcodebear/saltline-fable-5.2](https://github.com/realcodebear/saltline-fable-5.2) | Anthropic Claude 全自动生成的写实光影码头 3A 第一人称射击 |
| **QQ飞车 3D** | QQ Speed 3D: Drift Racing | 竞速漂移 | 本地离线 | [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) | 经典还原11城/爱琴海赛道、贴墙漂移、双喷、道具赛 |
| **穿越火线 · 运输船 3D** | CrossFire: Transport Ship 3D | 动作射击 | 本地离线 | [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) | 经典运输船 1:1 还原，保卫者 vs 潜伏者，智能 BOT 团队对战 |
| **鹈鹕骑单车** | Pelican on a Bike | 休闲治愈 | 本地离线 | [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) | 唯美落日海岸追鱼漫游、IK骨骼动画与治愈合成器音乐 |
| **黑神话 · 悟空 (天命人)** | Black Myth: Wukong | 3A冒险 | 云端嵌入 | [oneoyn](https://github.com/oneoyn)（[体验站](https://wukong.cnmwx.com/)） | 网页三维西游动作 RPG，行云流水识破劈棍、定身法与闪避 |
| **黑神话 · 关羽** | Black Myth: Guan Yu | 3A冒险 | 云端嵌入 | [xinayida/fablegames](https://github.com/xinayida/fablegames)（[体验站](https://ai-native-d9gyz4kr613a26c4f-1344763503.tcloudbaseapp.com/)） | 三国武圣硬核冷兵器格斗，青龙偃月刀破阵连击 |
| **英雄联盟 · 海克斯大乱斗** | League of Legends: Hextech ARAM | 角色扮演 | 云端嵌入 | [hanyue](https://github.com/hanyue)（[体验站](https://lol.hanyue.io/)） | 嚎哭深渊极地推塔、亚索/金克丝招牌技能、海克斯符文三选一 |
| **元素法师** | Elemental Mage: Fire & Lightning | 动作射击 | 本地离线 | [xinayida/fablegames](https://github.com/xinayida/fablegames) | 烈火轰炸、连锁闪电与极寒冰锥，多系法术爽快割草 |

---

## 🌟 开源游戏致敬与代码出处 (Credits & Repositories)

本平台所有收录与引用的游戏均尊重并保留原作者署名与开源出处：

1. **Saltline (盐线)**  
   - 作者：`realcodebear` (Powered by Claude Fable 5.2)  
   - 源码仓库：[https://github.com/realcodebear/saltline-fable-5.2](https://github.com/realcodebear/saltline-fable-5.2)  
   - 在线体验：[https://realcodebear.github.io/saltline-fable-5.2/](https://realcodebear.github.io/saltline-fable-5.2/)  

2. **QQ飞车 3D / 穿越火线 · 运输船 3D / 鹈鹕骑单车**  
   - 作者：`riba2534` (Powered by Claude Opus 5.5 / Fable)  
   - 源码仓库：[https://github.com/riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo)  
   - 作者社交主页：[https://x.com/riba2534](https://x.com/riba2534)  

3. **黑神话 · 悟空 (天命人)**  
   - 创作者：`oneoyn`  
   - GitHub 主页：[https://github.com/oneoyn](https://github.com/oneoyn)  
   - 在线体验：[https://wukong.cnmwx.com/](https://wukong.cnmwx.com/)  

4. **黑神话 · 关羽**  
   - 出处：社区开发者创作（云开发托管）  
   - 平台收录：[https://github.com/xinayida/fablegames](https://github.com/xinayida/fablegames)  
   - 在线体验：[https://ai-native-d9gyz4kr613a26c4f-1344763503.tcloudbaseapp.com/](https://ai-native-d9gyz4kr613a26c4f-1344763503.tcloudbaseapp.com/)  

5. **英雄联盟 · 海克斯大乱斗**  
   - 创作者：`hanyue`  
   - 开发者主页：[https://github.com/hanyue](https://github.com/hanyue)  
   - 在线体验：[https://lol.hanyue.io/](https://lol.hanyue.io/)  

6. **元素法师 (Elemental Mage)**  
   - 出处：FableGames 本地原生集成作品  
   - 源码仓库：[https://github.com/xinayida/fablegames](https://github.com/xinayida/fablegames)  

---

## ✨ 核心功能与亮点

- 🎨 **CrazyGames 沉浸式暗黑霓虹风格**：深邃蓝黑底色、霓虹紫/青光效、卡片流光边框、水波纹与 3D 微动效。
- 🔍 **全局实时搜索与过滤**：支持中英文标题、拼音、标签检索，支持 `/` 或 `Ctrl+K` 快速呼出。
- 🌐 **双语多语言系统**：顶栏一键切换中/英文，游戏元数据、操作指南与全站 UI 丝滑本地化。
- 🏟️ **独立竞技场播放器 (Game Arena)**：
  - 剧场模式 (Theater Mode)、原生全屏 (Fullscreen API)、重置刷新。
  - **独立新窗口打开 (`↗️ 独立窗口`)**：支持跳脱 iframe 并在全屏独立标签页中运行。
  - **一键直达 GitHub 源码 (`💻 源码`)**：每个游戏均可直接访问对应的开源仓库。
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
