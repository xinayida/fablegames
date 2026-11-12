# 🎮 如何在 1 分钟内为 FableGames 聚合平台添加新游戏

FableGames 采用**极简热插拔式静态聚合架构**。你不需要编写任何后端代码或复杂的路由，只需 **2 步**，即可在 1 分钟内将任意单文件 HTML5 / WebGL / Canvas / 2D / 3D 游戏接入平台！

---

## ⚡ 极速添加流程（只需 2 步）

### 步骤 1：将游戏文件放入 `games/` 目录
将你的 HTML5 游戏文件（通常是 `.html` 格式，或包含入口文件的文件夹）放入项目的 `games/` 目录中：

```bash
# 示例：将新游戏 space-invaders.html 复制到 games/ 目录
games/
  ├── qq-speed-3d.html
  ├── elemental-mage.html
  └── space-invaders.html       <-- 新放入的游戏文件
```

> **提示**：如果游戏包含独立的图片/音效资源，可以将整个游戏文件夹放入 `games/`（例如 `games/space-invaders/index.html`）。

---

### 步骤 2：在 `js/games-data.js` 中追加一条配置
打开 [js/games-data.js](file:///Users/wangwei/workspace/project/fablegames/js/games-data.js)，在 `const GAMES = [...]` 数组中追加一个游戏配置对象：

```javascript
{
  id: 'space-invaders',                         // 唯一英文 ID（用于 URL hash 和收藏索引）
  slug: 'space-invaders-retro',                  // 友好路由标识
  title: '太空入侵者 · 复古星战',                 // 游戏中文标题
  titleEn: 'Space Invaders Retro',              // 游戏英文标题
  category: '经典街机',                          // 分类名（中文）
  categoryEn: 'Arcade Classics',                // 分类名（英文）
  categoryId: 'arcade',                         // 分类ID：adventure | action | racing | rpg | casual | arcade
  tags: ['街机', '射击', '像素', '太空', '怀旧'],  // 搜索标签（中文）
  tagsEn: ['Arcade', 'Shooter', 'Pixel', 'Space'], // 搜索标签（英文）
  rating: 4.7,                                  // 评分（0.0 ~ 5.0）
  plays: '45.2K',                               // 游玩次数展示文本
  featured: false,                              // 是否为首页顶栏焦点精选（true/false）
  hot: true,                                    // 是否标记为热门推荐（true/false）
  isNew: true,                                  // 是否标记为新上线（true/false）
  releaseDate: '2024-11-12',                    // 上线日期 (YYYY-MM-DD)
  developer: 'Retro Pixel Lab',                 // 开发者 / 工作室名称
  fileUrl: 'games/space-invaders.html',         // 游戏入口文件相对路径
  cover: 'assets/covers/space-invaders.webp',   // 游戏封面（真实运行截图，可选，不填则自动使用默认封面）
  summary: '重温 80 年代经典投币机太空弹幕射击的激情对决！', // 一句话简介（中文）
  summaryEn: 'Defend Earth against endless waves of descending alien invaders!', // 一句话简介（英文）
  description: '经典街机完美重制！驾驶你的银河战机击溃一波波压境而来的外星飞船，拾取强化护盾与散射粒子炮。',
  descriptionEn: 'Classic arcade shooter reborn! Dodge alien bombardments, collect powerups, and clear escalating waves.',
  features: [
    '完美复刻原汁原味的 8-bit 复古像素画风与经典音效',
    '支持键盘与触屏双模操作，响应延迟极低',
    '无尽闯关与本地高分排行榜记录'
  ],
  controls: [
    { key: 'A / D 或 左右方向键', action: '左右移动战机', actionEn: 'Move Left / Right' },
    { key: '空格 Space', action: '发射主炮激光', actionEn: 'Fire Laser Cannon' },
    { key: 'P 键', action: '暂停游戏 / 继续', actionEn: 'Pause / Resume' }
  ]
}
```

保存文件并刷新页面，新游戏就会立即出现在首页分类、推荐流、搜索结果以及独立的游玩播放器页中！

---

## 🎨 游戏封面图规格与制作建议

> **重要原则**：所有封面**必须使用游戏的真实运行画面截图**（展示实际 Gameplay、3D 渲染光影、战斗特效或核心玩法界面），杜绝任何脱离实际玩法的 AI 生成图或非游戏合成插图，以保障用户所见即所得的游玩体验。

| 规格属性 | 推荐值 | 说明 |
| :--- | :--- | :--- |
| **画面内容** | **游戏真实运行截图** | 截取具有视觉冲击力的实机游玩画面（如法术爆炸、高光战斗、精美场景） |
| **推荐比例** | **16:9**（1280 × 720 或 800 × 450） | 适配 CrazyGames 风格的卡片缩略图与顶部焦点横幅 |
| **推荐格式** | **WebP** 或 **PNG** | WebP 兼具高清画质与极小体积（通常几十KB），首选推荐 |
| **存放位置** | `assets/covers/<your-game-id>.webp` | 统一存放以便集中管理 |
| **默认回退** | `assets/covers/default-fallback.svg` | **若未提供 `cover` 属性**，系统会自动使用带赛博发光手柄的默认封面 |

### 📸 自动化截取封面脚本
平台内置了基于 Playwright 与本地 Chromium 的真实游戏运行截图工具，支持 Canvas 与 WebGL 3D 渲染实机画面捕获：

```bash
# 自动启动本地环境并对游戏进行实机运行截图（生成标准 16:9 .webp 资产到 assets/covers/）
uv run scripts/capture_all_covers.py
```

---

## 📋 字段完整数据字典 (Data Schema)

| 字段名 | 类型 | 必填 | 示例值 | 说明 |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `String` | **是** | `'elemental-mage'` | 游戏唯一标识（小写英文字母、数字和横杠） |
| `title` | `String` | **是** | `'元素法师 · 火球与闪电'` | 游戏中文显示名称 |
| `fileUrl` | `String` | **是** | `'games/elemental-mage.html'` | 游戏在 `games/` 中的相对路径 |
| `category` | `String` | 否 | `'动作射击'` | 页面显示的分类名称 |
| `categoryId`| `String` | 否 | `'action'` | 分类筛选标识：`adventure` / `action` / `rpg` / `casual` / `arcade` |
| `rating` | `Number` | 否 | `4.9` | 推荐评分（0.0 ~ 5.0），卡片展示金黄色星标 |
| `plays` | `String` | 否 | `'128.5K'` | 游玩量展示标签 |
| `featured` | `Boolean`| 否 | `true` | 是否展示在首页大头条 Hero Showcase |
| `hot` | `Boolean`| 否 | `true` | 是否具有「🔥 HOT」高光徽章 |
| `isNew` | `Boolean`| 否 | `true` | 是否具有「🆕 NEW」上线徽章 |
| `cover` | `String` | 否 | `'assets/covers/xxx.webp'` | 封面图片路径（规范要求优先使用真实游戏运行截图，缺省时自动使用默认封面） |
| `controls` | `Array` | 否 | `[{ key: 'WASD', action: '移动' }]` | 详细键位说明，会在播放器下方渲染为按键操作卡 |
| `description`| `String`| 否 | `'丰富中文介绍...'` | 游戏详细玩法与背景介绍 |
| `descriptionEn`| `String`| 否 | `'Rich English intro...'` | 英文版介绍，供双语切换使用 |

---

## 🛠️ HTML5 游戏兼容性最佳实践

为了在嵌入播放器（Iframe）中获得最佳游玩体验，建议新添加的游戏注意以下几点：

1. **响应式自适应（Responsive Canvas）**：
   - 监听 `window.addEventListener('resize', ...)` 动态调整 Canvas 宽高等比缩放；
   - 样式设置 `margin: 0; overflow: hidden; width: 100%; height: 100%;` 保证充满容器。
2. **键盘事件聚焦（Keyboard Focus）**：
   - 为 `<canvas id="game" tabindex="0">` 添加 `tabindex="0"`，或在页面点击时调用 `canvas.focus()`，避免方向键或空格键滚动外层页面。
3. **音频播放策略（Autoplay Audio）**：
   - 现代浏览器要求在用户产生首个交互（点击或按键）后再启动 Web Audio API `AudioContext.resume()`。
4. **Iframe 沙箱权限（Permissions）**：
   - FableGames 播放器已预置 `allow="fullscreen; autoplay; gamepad; pointer-lock"`，支持游戏请求全屏、手柄接入及鼠标锁定（FPS/3D 准星）。
