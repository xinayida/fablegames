---
description: 游戏缩略图与封面资产管理规范
trigger: always_on
---

# 游戏缩略图规范 (Game Thumbnails & Covers Guidelines)

在 FableGames 平台中添加或维护游戏时，必须严格遵守以下缩略图与封面资产管理规范：

## 1. 真实截图优先原则 (Real In-Game Screenshots First)
- **尽量使用游戏真实运行截图**：添加或接入新游戏时，游戏缩略图（`cover`）必须尽量使用该游戏的真实运行截图（In-game Real Screenshot）。
- **严禁替代品**：严禁使用纯文字排版、纯色色块或简陋的矢量 SVG 图标替代真实的游戏实机画面。
- **关键高光捕捉**：截图应尽可能捕捉具有代表性、高动态与高视觉冲击力的场景，例如：
  - 3D 赛道飞驰、氮气加速、漂移过弯与仪表盘；
  - 第一人称射击第一视角持枪、集装箱掩体、瞄准交火；
  - 开放世界角色动作、高画质光影材质与远景；
  - 酷炫全屏法术弹幕连段与粒子爆裂；
  - 具有沉浸感的主角实机站姿或大厅战斗准备画面。

## 2. 格式与尺寸标准 (Format & Resolution Standards)
- **图像格式**：统一采用现代化、高压缩比、高画质的 **WebP** 格式（质量推荐 `quality=92`）。
- **画幅比例**：严格保持 **16:9** 标准宽屏比例，推荐分辨率为 **1280 × 720**（或等比高清缩放）。
- **存储路径**：
  - 缩略图统一存放在 `assets/covers/<game-id>.webp`。
  - 在 `js/games-data.js` 中将 `cover` 字段配置为对应的相对路径（如 `'assets/covers/<game-id>.webp'`）。

## 3. 自动化截图流程 (Automated Capture Pipeline)
- 项目中内置了基于 Playwright 的自动化实机截图工具：
  ```bash
  uv run scripts/capture_all_covers.py
  ```
- 该脚本通过无头浏览器自动拉起游戏，触发开始按钮或核心游戏逻辑后截取并生成标准尺寸的 WebP 资产。
