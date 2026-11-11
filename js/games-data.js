/**
 * FableGames - Games Data Repository & Schema Definition
 * Exported to window.GAMES_DATA
 * 
 * Inspired by CrazyGames, this data module provides rich metadata, 
 * localization (zh-CN & en), category indices, and lookup helpers.
 */

(function () {
  'use strict';

  /**
   * Category Definitions
   */
  const CATEGORIES = [
    { id: 'all', name: '全部', nameEn: 'All Games', icon: '🎮', color: '#7c3aed' },
    { id: 'hot', name: '热门推荐', nameEn: 'Hot & Trending', icon: '🔥', color: '#ef4444' },
    { id: 'adventure', name: '3A冒险', nameEn: '3A Adventure', icon: '🧭', color: '#f59e0b' },
    { id: 'action', name: '动作射击', nameEn: 'Action & Shooting', icon: '⚡', color: '#06b6d4' },
    { id: 'rpg', name: '角色扮演', nameEn: 'RPG', icon: '🛡️', color: '#8b5cf6' },
    { id: 'casual', name: '休闲益智', nameEn: 'Casual & Puzzle', icon: '🧩', color: '#10b981' },
    { id: 'arcade', name: '经典街机', nameEn: 'Arcade Classics', icon: '👾', color: '#ec4899' }
  ];

  /**
   * Master Games List
   * Note: fileUrl should point to a standalone HTML5 game file in games/
   */
  const GAMES = [
    {
      id: 'jimao-3a',
      slug: 'jimao-3a-odyssey',
      title: '几猫3A大作',
      titleEn: 'Feline 3A Odyssey',
      category: '3A冒险',
      categoryEn: '3A Adventure',
      categoryId: 'adventure',
      tags: ['3D', '开放世界', '动作', '几猫', '国产3A'],
      tagsEn: ['3D', 'Open World', 'Action', 'Feline', 'Cyberpunk'],
      rating: 4.9,
      ratingCount: 15420,
      plays: '128.5K',
      playsNum: 128500,
      featured: true,
      hot: true,
      isNew: false,
      releaseDate: '2024-11-10',
      developer: '几猫工作室 / Feline Studio',
      fileUrl: 'games/几猫国产3A大作_V1.html',
      cover: 'assets/covers/jimao-3a.webp',
      banner: 'assets/covers/jimao-3a.webp',
      summary: '首款基于 WebGL 的国产高保真猫咪 3D 开放世界动作冒险大作！',
      summaryEn: 'Next-gen WebGL feline open-world 3D action adventure!',
      description: '首款基于 WebGL / Three.js 打造的国产高保真猫咪开放世界冒险游戏！化身拥有超凡机动性的赛博流浪几猫，在宏伟辽阔的虚幻光影世界中奔跑、跳跃、探索未知废墟与神秘遗迹。体验丝滑的移动手感、爽快的动作打击以及令人惊叹的环境交互！即点即玩，无需下载，纯浏览器原生 60FPS 极速渲染。',
      descriptionEn: 'The revolutionary WebGL-powered 3D feline open-world adventure! Step into the paws of an agile cyber-cat exploring a vast realm of neon ruins, towering monoliths, and ancient secrets. Featuring fluid character locomotion, kinetic combat combos, and stunning procedural lighting directly in your browser with zero installs.',
      features: [
        '极富视觉冲击力的次世代 WebGL 3D 开放世界全景渲染',
        '拟真物理骨骼引擎与高帧率动作反馈（跳跃、翻滚、攀爬）',
        '赛博猫咪专属视角与沉浸式光影遗迹探秘',
        '即点即玩零等待，极致优化极速加载'
      ],
      featuresEn: [
        'Breathtaking 3D open-world rendering powered by WebGL',
        'Physics-driven feline locomotion, acrobatics, and fluid combat',
        'Immersive cyber-feline HUD and procedural atmospheric lighting',
        'Instant browser-native play with zero plug-ins required'
      ],
      controls: [
        { key: 'W A S D', action: '角色移动 / 奔跑', actionEn: 'Move / Run' },
        { key: '鼠标移动', action: '旋转视角 / 自由观察', actionEn: 'Rotate Camera / Look' },
        { key: '鼠标左键', action: '轻重连击 / 场景交互', actionEn: 'Attack / Interact' },
        { key: '空格 Space', action: '起跳 / 空中翻滚', actionEn: 'Jump / Air Dodge' },
        { key: 'Left Shift', action: '战术疾跑冲刺', actionEn: 'Tactical Sprint / Dash' },
        { key: 'E 键', action: '猫咪感知 / 特殊技能', actionEn: 'Feline Sense / Special' }
      ],
      controlsMap: {
        'WASD': '移动',
        '鼠标': '视角/瞄准',
        '左键': '攻击/交互',
        '空格': '跳跃',
        'Shift': '冲刺'
      }
    },
    {
      id: 'elemental-mage',
      slug: 'elemental-mage-fire-thunder',
      title: '元素法师 · 火球与闪电',
      titleEn: 'Elemental Mage: Fire & Thunder',
      category: '动作射击',
      categoryEn: 'Action & Magic',
      categoryId: 'action',
      tags: ['魔法', '射击', '连击', '特效', '像素弹幕'],
      tagsEn: ['Magic', 'Shooter', 'Combos', 'Particles', 'Survivors'],
      rating: 4.8,
      ratingCount: 9840,
      plays: '86.2K',
      playsNum: 86200,
      featured: false,
      hot: false,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Arcane Forge Studio',
      fileUrl: 'games/elemental-mage.html',
      cover: 'assets/covers/elemental-mage.webp',
      banner: 'assets/covers/elemental-mage.webp',
      summary: '操纵火/冰/雷三大原初元素，全屏绚丽法术爆破割草射击！',
      summaryEn: 'Wield fire, ice, and thunder spells in high-octane particle arcade blasting!',
      description: '操纵大自然原初元素的禁忌力量！在汹涌而来的魔怪狂潮中，自由切换炽热烈焰、刺骨严霜与毁灭奔雷。组合元素法术打出毁灭性的元素共鸣连击，享受粒子特效爆裂的解压割草射击快感！支持全屏震撼法术大招与丝滑顺畅的微操走位。',
      descriptionEn: 'Master the primal arcane forces of Fire, Frost, and Lightning! Face unrelenting waves of shadow beasts by seamlessly weaving elemental spells. Trigger explosive elemental reactions, chain lightning across hordes, and experience pure arcade blast action with dazzling full-screen particle cascades.',
      features: [
        '绚丽震撼的物理粒子法术特效与全屏爆炸冲击',
        '火系爆破、冰系缓速、雷系连锁三位一体自由切换',
        '爽快解压的怪物波次割草与连击计分体系',
        '极低资源占用，高帧率丝滑走位与弹幕躲避'
      ],
      featuresEn: [
        'Dazzling GPU particle physics and explosive spell impacts',
        'Tri-element switching: explosive Fire, freezing Frost, chaining Thunder',
        'Satisfying monster horde clears with arcade combo multipliers',
        'Ultra lightweight, buttery-smooth 60+ FPS micro-movement controls'
      ],
      controls: [
        { key: '鼠标移动', action: '法术瞄准准星', actionEn: 'Aim Spell Cursor' },
        { key: '鼠标左键', action: '施放当前元素法术', actionEn: 'Cast Elemental Spell' },
        { key: '数字键 1', action: '切换 火系 · 烈焰大火球', actionEn: 'Switch to Fire (Explosive Fireball)' },
        { key: '数字键 2', action: '切换 冰系 · 冰霜寒刺', actionEn: 'Switch to Frost (Freezing Shard)' },
        { key: '数字键 3', action: '切换 雷系 · 链式闪电', actionEn: 'Switch to Thunder (Chain Lightning)' },
        { key: '空格 Space', action: '奥术闪现瞬移', actionEn: 'Arcane Blink / Teleport' }
      ],
      controlsMap: {
        '鼠标移动': '瞄准',
        '鼠标左键': '施放元素法术',
        '1/2/3': '切换火/冰/雷元素'
      }
    }
  ];

  /**
   * Fallback Cover Placeholder
   */
  const DEFAULT_COVER = 'assets/covers/default-fallback.svg';

  /**
   * Helper and Query API
   */
  const GAMES_DATA = {
    games: GAMES,
    categories: CATEGORIES,
    defaultCover: DEFAULT_COVER,

    /**
     * Get all games
     * @returns {Array} List of all game objects
     */
    getAll: function () {
      return this.games.slice();
    },

    /**
     * Get game by unique ID
     * @param {string} id
     * @returns {Object|null}
     */
    getById: function (id) {
      if (!id) return null;
      const target = String(id).toLowerCase().trim();
      return this.games.find(g => g.id.toLowerCase() === target || g.slug.toLowerCase() === target) || null;
    },

    /**
     * Get featured game (for hero showcase)
     * @returns {Object}
     */
    getFeatured: function () {
      return this.games.find(g => g.featured) || this.games[0] || null;
    },

    /**
     * Get hot / trending games
     * @returns {Array}
     */
    getHot: function () {
      const hotGames = this.games.filter(g => g.hot);
      return hotGames.length > 0 ? hotGames : this.games.slice();
    },

    /**
     * Get newly added games
     * @returns {Array}
     */
    getNew: function () {
      const newGames = this.games.filter(g => g.isNew);
      return newGames.length > 0 ? newGames : this.games.slice();
    },

    /**
     * Filter games by category id ('all', 'adventure', 'action', etc.)
     * @param {string} categoryId
     * @returns {Array}
     */
    getByCategory: function (categoryId) {
      if (!categoryId || categoryId === 'all') {
        return this.getAll();
      }
      if (categoryId === 'hot') {
        return this.getHot();
      }
      return this.games.filter(g => g.categoryId === categoryId);
    },

    /**
     * Search games by keyword across title, tags, description, category
     * @param {string} query
     * @returns {Array}
     */
    search: function (query) {
      if (!query || typeof query !== 'string') return this.getAll();
      const q = query.toLowerCase().trim();
      if (!q) return this.getAll();

      return this.games.filter(g => {
        return (
          g.title.toLowerCase().includes(q) ||
          g.titleEn.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.categoryEn.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q)) ||
          g.tagsEn.some(t => t.toLowerCase().includes(q)) ||
          g.description.toLowerCase().includes(q) ||
          g.descriptionEn.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q)
        );
      });
    },

    /**
     * Get related games for recommendation carousel
     * @param {string} currentGameId
     * @param {number} limit
     * @returns {Array}
     */
    getRecommendations: function (currentGameId, limit = 4) {
      const filtered = this.games.filter(g => g.id !== currentGameId);
      return filtered.slice(0, limit);
    },

    /**
     * Get list of categories
     * @returns {Array}
     */
    getCategories: function () {
      return this.categories.slice();
    },

    /**
     * Register a new game dynamically at runtime
     * @param {Object} gameObj
     * @returns {boolean}
     */
    addGame: function (gameObj) {
      if (!gameObj || !gameObj.id || !gameObj.title || !gameObj.fileUrl) {
        console.error('Invalid game object. Required fields: id, title, fileUrl');
        return false;
      }
      if (this.getById(gameObj.id)) {
        console.warn('Game with ID ' + gameObj.id + ' already exists. Overwriting.');
        const index = this.games.findIndex(g => g.id === gameObj.id);
        this.games[index] = Object.assign({}, this.games[index], gameObj);
        return true;
      }
      if (!gameObj.cover) {
        gameObj.cover = this.defaultCover;
      }
      this.games.push(gameObj);
      return true;
    }
  };

  // Expose to window globally in browser, or globalThis
  if (typeof window !== 'undefined') {
    window.GAMES_DATA = GAMES_DATA;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.GAMES_DATA = GAMES_DATA;
  }

  // Support CommonJS/Node environments for testing if required
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAMES_DATA;
  }
})();
