/**
 * FableGames - Main Application Engine
 * High-performance, reactive, vanilla JS portal inspired by CrazyGames.
 */

(function () {
  'use strict';

  /* ========================================================================
     1. Constants & i18n Localization Dictionary
     ======================================================================== */
  const STORAGE_KEYS = {
    THEME: 'fablegames_theme',
    LANG: 'fablegames_lang',
    FAVORITES: 'fablegames_favorites',
    RECENTS: 'fablegames_recents',
    LIKES: 'fablegames_likes'
  };

  const I18N = {
    zh: {
      siteTitle: 'FableGames - Claude Fable 5.2 制作游戏中心 | 原生3D网页微游戏平台 | 即点即玩',
      metaDesc: 'FableGames 是全球首个汇聚 100% 由 Claude Fable 5.2 独立编码制作的原生 Web 网页微游戏平台。畅玩国产 3A 赛博猫咪大作、元素法师等极速即点即玩原生 HTML5 / WebGL 3D 游戏，零安装、零延迟、高帧率极致体验！',
      searchPlaceholder: '搜索游戏... (按 / 快捷键)',
      randomPlay: '随机一玩',
      favorites: '我的收藏',
      themeDark: '🌙 暗黑',
      themeLight: '☀️ 明亮',
      lang: 'EN',
      fullscreen: '⛶ 全屏',
      playNow: '立即畅玩',
      backToLobby: '返回大厅',
      theaterMode: '剧场模式',
      fullscreenGame: '全屏',
      reloadGame: '重置',
      openNewTab: '独立窗口',
      shareGame: '分享',
      controlsTitle: '操作说明',
      aboutTitle: '游戏简介',
      feedbackTitle: '玩家反馈与快捷评价',
      recommendedTitle: '猜你喜欢',
      trendingNow: '热门推荐',
      allGames: '全部精选',
      editorsChoice: '编辑精选',
      newArrivals: '最新上线',
      myFavorites: '我的收藏',
      gamesCount: '款精选游戏',
      noGamesFound: '未找到匹配的游戏',
      noGamesDesc: '换个关键词或切换分类筛选试试吧',
      resetFilters: '重置筛选',
      copiedToast: '游戏链接已复制到剪贴板！',
      favAddedToast: '已加入我的收藏！',
      favRemovedToast: '已从收藏中移除',
      loadingGame: '正在加载游戏核心资产...',
      ratingScore: '评分',
      plays: '次游玩',
      developer: '开发团队',
      releaseDate: '发布时间',
      voteHelpful: '给游戏点赞',
      voteCount: '人觉得好玩',
      quickTags: ['🔥 3A画面震撼', '⚡ 操作丝滑', '🐱 猫咪太可爱了', '💥 特效拉满', '🏆 满分神作'],
      
      // Claude Fable 5.2 & Footer i18n
      logoBadge: 'CLAUDE FABLE 5.2',
      announcementBadge: '✨ 100% CLAUDE FABLE 5.2',
      announcementText: '全网首家专注于汇聚 Claude Fable 5.2 制作的原生 3D / WebGL 网页微游戏平台 · 零安装即点即玩',
      aiEngine: 'AI 引擎',
      aiEngineName: 'Claude Fable 5.2 (Anthropic)',
      popularCategories: '热门分类',
      catAdventure: '🧭 3A冒险',
      catAction: '⚡ 动作射击',
      catRpg: '🛡️ 角色扮演',
      catCasual: '🧩 休闲益智',
      catRacing: '🏎️ 竞速漂移',
      catArcade: '👾 经典街机',
      footerColPlatform: '平台与探索',
      footerRandom: '🎲 随机好玩',
      footerAllGames: '🎮 全部游戏库',
      footerPrivacy: '🛡️ 隐私与安全',
      footerDesc: '全球首家专注汇聚 Claude Fable 5.2 制作游戏的聚合平台。站内所有游戏均由前沿 AI 模型 Claude Fable 5.2 纯原生 Web 代码独立打造，无需安装插件，即点即玩！尽情畅享高保真 3A 开放世界、魔法动作射击等零等待极速体验。',
      footerCopyright: '100% 游戏由 Claude Fable 5.2 制作 · 极速原生即玩',
      privacyToast: 'FableGames 严格遵守隐私保护规范，无任何第三方追踪器与恶意插件。',
      voteSuccessToast: '感谢点赞！已记录您的评价',
      voteRemoveToast: '已取消点赞',
      feedbackToastPrefix: '已提交反馈: ',
      themeDarkToast: '已切换至暗黑电竞主题',
      themeLightToast: '已切换至明亮主题',
      langZhToast: '已切换为中文',
      langEnToast: 'Switched to English',
      clearSearchTitle: '清空搜索',
      randomGameTitle: '随机挑一款游戏畅玩',
      favoritesTitle: '查看我收藏的游戏',
      themeToggleTitle: '切换暗黑/明亮主题',
      langToggleTitle: '切换语言 / Switch Language',
      fullscreenToggleTitle: '切换浏览器全屏'
    },
    en: {
      siteTitle: 'FableGames - 100% Claude Fable 5.2 AI-Generated Games | Play 3D Web Games Instantly',
      metaDesc: 'FableGames is the world\'s premier web game portal showcasing games 100% crafted & coded by Claude Fable 5.2. Play stunning 3D WebGL action games, open-world feline adventures, and arcade shooters instantly with zero installs.',
      searchPlaceholder: 'Search games... (Press /)',
      randomPlay: 'Random Game',
      favorites: 'Favorites',
      themeDark: '🌙 Dark',
      themeLight: '☀️ Light',
      lang: '中文',
      fullscreen: '⛶ Fullscreen',
      playNow: 'Play Now',
      backToLobby: 'Back to Lobby',
      theaterMode: 'Theater Mode',
      fullscreenGame: 'Fullscreen',
      reloadGame: 'Reload',
      openNewTab: 'New Tab',
      shareGame: 'Share',
      controlsTitle: 'Controls Guide',
      aboutTitle: 'About This Game',
      feedbackTitle: 'Player Reviews & Reactions',
      recommendedTitle: 'Recommended',
      trendingNow: 'Trending Now',
      allGames: 'All Games',
      editorsChoice: "Editor's Choice",
      newArrivals: 'New Releases',
      myFavorites: 'My Favorites',
      gamesCount: 'Games Found',
      noGamesFound: 'No games found',
      noGamesDesc: 'Try another search query or clear category filters',
      resetFilters: 'Reset Filters',
      copiedToast: 'Game link copied to clipboard!',
      favAddedToast: 'Added to your favorites!',
      favRemovedToast: 'Removed from favorites',
      loadingGame: 'Loading game runtime...',
      ratingScore: 'Rating',
      plays: 'Plays',
      developer: 'Developer',
      releaseDate: 'Release Date',
      voteHelpful: 'Upvote Game',
      voteCount: 'players enjoyed this',
      quickTags: ['🔥 Visual Masterpiece', '⚡ Butter Smooth', '🐱 Awesome Feline', '💥 Particle Magic', '🏆 10/10 Score'],

      // Claude Fable 5.2 & Footer i18n
      logoBadge: 'CLAUDE FABLE 5.2',
      announcementBadge: '✨ 100% CLAUDE FABLE 5.2',
      announcementText: "The World's 1st Web Game Portal 100% Crafted & Coded by Claude Fable 5.2 · Zero Installs Instant Play",
      aiEngine: 'AI Engine',
      aiEngineName: 'Claude Fable 5.2 (Anthropic)',
      popularCategories: 'Popular Categories',
      catAdventure: '🧭 3A Adventure',
      catAction: '⚡ Action & Shooting',
      catRpg: '🛡️ RPG',
      catCasual: '🧩 Casual & Puzzle',
      catRacing: '🏎️ Racing & Speed',
      catArcade: '👾 Arcade Classics',
      footerColPlatform: 'Platform & Explore',
      footerRandom: '🎲 Random Game',
      footerAllGames: '🎮 All Games',
      footerPrivacy: '🛡️ Privacy & Safety',
      footerDesc: 'The premier web game portal 100% crafted & coded by Claude Fable 5.2. Powered by native WebGL & HTML5, play 3D open worlds and action adventures instantly with zero installs and silky 60FPS performance!',
      footerCopyright: '100% Games Crafted by Claude Fable 5.2 · Browser Native Play',
      privacyToast: 'FableGames strictly respects user privacy with zero malicious plugins or trackers.',
      voteSuccessToast: 'Thanks for your upvote! Your feedback was recorded.',
      voteRemoveToast: 'Upvote removed.',
      feedbackToastPrefix: 'Feedback submitted: ',
      themeDarkToast: 'Switched to Dark Theme',
      themeLightToast: 'Switched to Light Theme',
      langZhToast: '已切换为中文',
      langEnToast: 'Switched to English',
      clearSearchTitle: 'Clear Search',
      randomGameTitle: 'Play a random game',
      favoritesTitle: 'View my favorites',
      themeToggleTitle: 'Toggle Dark / Light Theme',
      langToggleTitle: 'Switch Language / 切换语言',
      fullscreenToggleTitle: 'Toggle Fullscreen'
    }
  };

  /* ========================================================================
     2. Application State & Storage Helpers
     ======================================================================== */
  const AppState = {
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',
    lang: localStorage.getItem(STORAGE_KEYS.LANG) || 'zh',
    favorites: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')),
    recents: JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENTS) || '[]'),
    likes: JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '{}'),
    activeCategory: 'all',
    searchQuery: '',
    currentGame: null,
    heroGame: null,
    theaterMode: false,

    saveFavorites() {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(this.favorites)));
    },
    saveTheme() {
      localStorage.setItem(STORAGE_KEYS.THEME, this.theme);
    },
    saveLang() {
      localStorage.setItem(STORAGE_KEYS.LANG, this.lang);
    },
    saveLikes() {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(this.likes));
    },
    saveRecents(id) {
      this.recents = this.recents.filter(r => r.id !== id);
      this.recents.unshift({ id, time: Date.now() });
      if (this.recents.length > 20) this.recents.pop();
      localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(this.recents));
    },
    isFavorite(id) {
      return this.favorites.has(id);
    },
    toggleFavorite(id) {
      if (this.favorites.has(id)) {
        this.favorites.delete(id);
        this.saveFavorites();
        return false;
      } else {
        this.favorites.add(id);
        this.saveFavorites();
        return true;
      }
    },
    isLiked(id) {
      return !!this.likes[id];
    },
    toggleLike(id) {
      this.likes[id] = !this.likes[id];
      this.saveLikes();
      return this.likes[id];
    }
  };

  /* ========================================================================
     3. Helper & Normalization Functions
     ======================================================================== */
  function t(key) {
    const dict = I18N[AppState.lang] || I18N.zh;
    return dict[key] || key;
  }

  function getLocalizedTitle(game) {
    if (!game) return '';
    return (AppState.lang === 'en' && game.titleEn) ? game.titleEn : game.title;
  }

  function getLocalizedCategory(game) {
    if (!game) return '';
    return (AppState.lang === 'en' && game.categoryEn) ? game.categoryEn : game.category;
  }

  function getLocalizedSummary(game) {
    if (!game) return '';
    if (AppState.lang === 'en') {
      return game.summaryEn || game.descriptionEn || game.summary || game.description;
    }
    return game.summary || game.description;
  }

  function getLocalizedDescription(game) {
    if (!game) return '';
    if (AppState.lang === 'en') {
      return game.descriptionEn || game.description;
    }
    return game.description;
  }

  function getLocalizedTags(game) {
    if (!game) return [];
    if (AppState.lang === 'en' && game.tagsEn && game.tagsEn.length > 0) {
      return game.tagsEn;
    }
    return game.tags || [];
  }

  function getLocalizedFeatures(game) {
    if (!game) return [];
    if (AppState.lang === 'en' && game.featuresEn && game.featuresEn.length > 0) {
      return game.featuresEn;
    }
    return game.features || [];
  }

  function getNormalizedControls(game) {
    if (!game || !game.controls) return [];
    return game.controls.map(c => {
      if (typeof c === 'string') {
        const parts = c.split(':');
        return { key: parts[0].trim(), action: (parts[1] || '').trim() };
      }
      const action = (AppState.lang === 'en' && c.actionEn) ? c.actionEn : c.action;
      return { key: c.key, action: action };
    });
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ========================================================================
     4. UI Renderers
     ======================================================================== */

  /**
   * Apply Theme (Dark / Light)
   */
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.textContent = AppState.theme === 'dark' ? '🌙' : '☀️';
    }
  }

  /**
   * Render Player Feedback Tags with current language
   */
  function renderFeedbackTags() {
    const container = document.getElementById('feedbackTags');
    if (!container) return;
    const tags = (I18N[AppState.lang] && I18N[AppState.lang].quickTags) ? I18N[AppState.lang].quickTags : I18N.zh.quickTags;
    container.innerHTML = tags.map(tag => `<button class="tag-pill-btn">${escapeHtml(tag)}</button>`).join('');
    container.querySelectorAll('.tag-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        showToast(t('feedbackToastPrefix') + btn.textContent.trim());
      });
    });
  }

  /**
   * Apply Language and translate DOM elements with data-i18n
   */
  function applyLanguage() {
    document.documentElement.lang = AppState.lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('siteTitle');
    
    // Dynamic Meta Description for SEO
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('metaDesc'));
    }

    const langText = document.getElementById('langText');
    if (langText) {
      langText.textContent = AppState.lang === 'zh' ? 'EN' : '中';
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.placeholder = t('searchPlaceholder');
    }

    // Update Action Button Titles
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) clearBtn.title = t('clearSearchTitle');
    const randomBtn = document.getElementById('btnRandomGame');
    if (randomBtn) randomBtn.title = t('randomGameTitle');
    const favHeaderBtn = document.getElementById('btnFavorites');
    if (favHeaderBtn) favHeaderBtn.title = t('favoritesTitle');
    const themeBtn = document.getElementById('btnThemeToggle');
    if (themeBtn) themeBtn.title = t('themeToggleTitle');
    const langBtn = document.getElementById('btnLangToggle');
    if (langBtn) langBtn.title = t('langToggleTitle');
    const fullBtn = document.getElementById('btnFullscreenToggle');
    if (fullBtn) fullBtn.title = t('fullscreenToggleTitle');

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && I18N[AppState.lang] && I18N[AppState.lang][key]) {
        el.textContent = I18N[AppState.lang][key];
      }
    });

    // Re-render feedback reaction pills with localized tags
    renderFeedbackTags();

    // Re-render dynamic sections with new language strings
    renderCategories();
    renderHeroBanner();
    renderGamesGrid();
    if (AppState.currentGame) {
      renderArenaDetails(AppState.currentGame);
    }
  }

  /**
   * Update Favorites counter badge in header
   */
  function updateFavoritesCounter() {
    const badge = document.getElementById('favCountBadge');
    if (!badge) return;
    const count = AppState.favorites.size;
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  /**
   * Render Category Navigation Pills
   */
  function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container || !window.GAMES_DATA) return;

    const categories = window.GAMES_DATA.getCategories();
    container.innerHTML = '';

    categories.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `category-pill ${AppState.activeCategory === cat.id ? 'active' : ''}`;
      pill.dataset.categoryId = cat.id;

      const catName = (AppState.lang === 'en' && cat.nameEn) ? cat.nameEn : cat.name;
      const count = window.GAMES_DATA.getByCategory(cat.id).length;

      pill.innerHTML = `
        <span>${cat.icon}</span>
        <span>${escapeHtml(catName)}</span>
        <span class="category-pill-count">${count}</span>
      `;

      pill.addEventListener('click', () => {
        window.location.hash = cat.id === 'all' ? '#/' : `#/category/${cat.id}`;
      });

      container.appendChild(pill);
    });
  }

  /**
   * Render Hero Showcase Banner
   */
  function renderHeroBanner() {
    const container = document.getElementById('heroSection');
    if (!container || !window.GAMES_DATA) return;

    const allGames = window.GAMES_DATA.getAll();
    if (allGames.length === 0) {
      container.innerHTML = '';
      return;
    }

    if (!AppState.heroGame) {
      AppState.heroGame = window.GAMES_DATA.getFeatured() || allGames[0];
    }
    const game = AppState.heroGame;

    const title = getLocalizedTitle(game);
    const category = getLocalizedCategory(game);
    const summary = getLocalizedSummary(game);
    const tags = getLocalizedTags(game);
    const isFav = AppState.isFavorite(game.id);

    // Mini thumbnails switcher
    let thumbsHtml = '';
    if (allGames.length > 1) {
      thumbsHtml = `
        <div class="hero-thumbs">
          ${allGames.map(g => `
            <div class="hero-thumb-btn ${g.id === game.id ? 'active' : ''}" data-hero-id="${g.id}" title="${escapeHtml(getLocalizedTitle(g))}">
              <img src="${g.cover || window.GAMES_DATA.defaultCover}" alt="${escapeHtml(getLocalizedTitle(g))}">
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="hero-banner">
        <img class="hero-backdrop-img" src="${game.cover || window.GAMES_DATA.defaultCover}" alt="${escapeHtml(title)}">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-badges-row">
            <span class="badge badge-fable">🤖 CLAUDE FABLE 5.2</span>
            ${game.featured ? '<span class="badge badge-3a">⭐ 3A MASTERPIECE</span>' : ''}
            ${game.hot ? '<span class="badge badge-hot">🔥 HOT</span>' : ''}
            ${game.isNew ? '<span class="badge badge-new">🆕 NEW</span>' : ''}
            <span class="badge badge-rating">★ ${game.rating}</span>
            <span class="badge badge-category">${escapeHtml(category)}</span>
          </div>

          <h1 class="hero-title">${escapeHtml(title)}</h1>
          <p class="hero-description">${escapeHtml(summary)}</p>

          <div class="hero-tags-row">
            ${tags.map(t => `<span class="hero-tag"># ${escapeHtml(t)}</span>`).join('')}
          </div>

          <div class="hero-actions">
            <button class="btn-cta-play" id="heroPlayBtn" data-game-id="${game.id}">
              <span>▶</span>
              <span>${t('playNow')}</span>
            </button>
            <button class="btn-cta-fav ${isFav ? 'favorited' : ''}" id="heroFavBtn" data-game-id="${game.id}" title="${t('favorites')}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        ${thumbsHtml}
      </div>
    `;

    // Bind Hero Events
    const playBtn = document.getElementById('heroPlayBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        window.location.hash = `#/play/${game.id}`;
      });
    }

    const favBtn = document.getElementById('heroFavBtn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const favorited = AppState.toggleFavorite(game.id);
        favBtn.classList.toggle('favorited', favorited);
        favBtn.textContent = favorited ? '❤️' : '🤍';
        updateFavoritesCounter();
        showToast(favorited ? t('favAddedToast') : t('favRemovedToast'));
        renderGamesGrid();
      });
    }

    // Bind mini thumbs switcher
    container.querySelectorAll('.hero-thumb-btn').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const id = thumb.dataset.heroId;
        const targetGame = window.GAMES_DATA.getById(id);
        if (targetGame) {
          AppState.heroGame = targetGame;
          renderHeroBanner();
        }
      });
    });
  }

  /**
   * Render Games Grid Cards
   */
  function renderGamesGrid() {
    const grid = document.getElementById('gamesGrid');
    const titleEl = document.getElementById('gridTitle');
    const iconEl = document.getElementById('gridIcon');
    const countBadge = document.getElementById('gridCountBadge');
    if (!grid || !window.GAMES_DATA) return;

    let games = [];

    // Filter logic
    if (AppState.activeCategory === 'favorites') {
      games = window.GAMES_DATA.getAll().filter(g => AppState.isFavorite(g.id));
      if (titleEl) titleEl.textContent = t('myFavorites');
      if (iconEl) iconEl.textContent = '❤️';
    } else if (AppState.searchQuery) {
      games = window.GAMES_DATA.search(AppState.searchQuery);
      if (titleEl) titleEl.textContent = `"${AppState.searchQuery}" - ${t('searchPlaceholder')}`;
      if (iconEl) iconEl.textContent = '🔍';
    } else {
      games = window.GAMES_DATA.getByCategory(AppState.activeCategory);
      const catObj = window.GAMES_DATA.getCategories().find(c => c.id === AppState.activeCategory);
      if (catObj) {
        if (titleEl) titleEl.textContent = (AppState.lang === 'en' && catObj.nameEn) ? catObj.nameEn : catObj.name;
        if (iconEl) iconEl.textContent = catObj.icon;
      } else {
        if (titleEl) titleEl.textContent = t('trendingNow');
        if (iconEl) iconEl.textContent = '🔥';
      }
    }

    if (countBadge) {
      countBadge.textContent = `${games.length} ${t('gamesCount')}`;
    }

    // Empty state
    if (games.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎮</div>
          <h3 class="empty-title">${t('noGamesFound')}</h3>
          <p class="empty-desc">${t('noGamesDesc')}</p>
          <button class="btn-reset-filter" id="btnResetFilter">${t('resetFilters')}</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          AppState.searchQuery = '';
          const searchInput = document.getElementById('searchInput');
          if (searchInput) searchInput.value = '';
          window.location.hash = '#/';
        });
      }
      return;
    }

    grid.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.dataset.gameId = game.id;

      const title = getLocalizedTitle(game);
      const category = getLocalizedCategory(game);
      const tags = getLocalizedTags(game);
      const isFav = AppState.isFavorite(game.id);

      card.innerHTML = `
        <div class="card-media">
          <img class="card-img" src="${game.cover || window.GAMES_DATA.defaultCover}" alt="${escapeHtml(title)}" loading="lazy">
          <div class="card-badges">
            ${game.featured ? '<span class="badge badge-3a">3A</span>' : ''}
            ${game.hot ? '<span class="badge badge-hot">HOT</span>' : ''}
            ${game.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
          </div>
          <button class="card-fav-btn ${isFav ? 'favorited' : ''}" data-fav-id="${game.id}" title="${t('favorites')}">
            ${isFav ? '❤️' : '🤍'}
          </button>
          <div class="card-overlay">
            <div class="card-play-btn">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title" title="${escapeHtml(title)}">${escapeHtml(title)}</h3>
          </div>
          <div class="card-meta-row">
            <span class="card-category">${escapeHtml(category)}</span>
            <div class="card-stats">
              <span class="card-plays">👁️ ${game.plays || '10K+'}</span>
              <span class="card-rating">★ ${game.rating}</span>
            </div>
          </div>
          <div class="card-tags">
            ${tags.slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      `;

      // Open Arena when card clicked
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-fav-btn')) return;
        window.location.hash = `#/play/${game.id}`;
      });

      // Favorite button
      const favBtn = card.querySelector('.card-fav-btn');
      if (favBtn) {
        favBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const favorited = AppState.toggleFavorite(game.id);
          favBtn.classList.toggle('favorited', favorited);
          favBtn.textContent = favorited ? '❤️' : '🤍';
          updateFavoritesCounter();
          showToast(favorited ? t('favAddedToast') : t('favRemovedToast'));
          if (AppState.activeCategory === 'favorites') {
            renderGamesGrid();
          }
        });
      }

      grid.appendChild(card);
    });
  }

  /**
   * Render Arena Game Player View
   */
  function renderArena(gameId) {
    if (!window.GAMES_DATA) return;
    const game = window.GAMES_DATA.getById(gameId);
    if (!game) {
      showToast('Game not found');
      window.location.hash = '#/';
      return;
    }

    AppState.currentGame = game;
    AppState.saveRecents(game.id);

    const lobbyView = document.getElementById('lobbyView');
    const arenaView = document.getElementById('arenaView');
    if (lobbyView) lobbyView.classList.add('hidden');
    if (arenaView) arenaView.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mini Header Controls in Arena
    const titleMini = document.getElementById('arenaGameTitleMini');
    const catMini = document.getElementById('arenaGameCategoryMini');
    const ratingMini = document.getElementById('arenaGameRatingMini');
    if (titleMini) titleMini.textContent = getLocalizedTitle(game);
    if (catMini) catMini.textContent = getLocalizedCategory(game);
    if (ratingMini) ratingMini.textContent = `★ ${game.rating}`;

    // Favorite Button in Arena
    const favBtn = document.getElementById('btnFavGame');
    const favIcon = document.getElementById('arenaFavIcon');
    if (favBtn && favIcon) {
      const isFav = AppState.isFavorite(game.id);
      favBtn.classList.toggle('favorited', isFav);
      favIcon.textContent = isFav ? '❤️' : '🤍';
    }

    // Set Iframe & Loading State without polluting browser history
    const iframe = document.getElementById('gameIframe');
    const loadingOverlay = document.getElementById('arenaLoadingOverlay');
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    // Update Open In New Tab button href
    const btnOpenExternal = document.getElementById('btnOpenExternal');
    if (btnOpenExternal) {
      btnOpenExternal.href = game.originalUrl || game.fileUrl;
    }

    if (iframe) {
      iframe.onload = () => {
        setTimeout(() => {
          if (loadingOverlay) loadingOverlay.classList.add('hidden');
        }, 400);
      };
      const targetUrl = game.fileUrl;
      let rawLoc = '';
      try {
        rawLoc = (iframe.contentWindow && iframe.contentWindow.location && iframe.contentWindow.location.href) || iframe.src || '';
      } catch (e) {
        rawLoc = iframe.src || '';
      }
      let isSame = false;
      try {
        isSame = !!rawLoc && (rawLoc.endsWith(targetUrl) || decodeURI(rawLoc).endsWith(targetUrl) || rawLoc.endsWith(encodeURI(targetUrl)));
      } catch (e) {
        isSame = !!rawLoc && rawLoc.endsWith(targetUrl);
      }
      if (!isSame) {
        try {
          if (iframe.contentWindow && iframe.contentWindow.location && typeof iframe.contentWindow.location.replace === 'function') {
            iframe.contentWindow.location.replace(targetUrl);
          } else {
            iframe.src = targetUrl;
          }
        } catch (e) {
          iframe.src = targetUrl;
        }
      } else {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
      }
    }

    // Render Controls, About, Feedback & Recommendations
    renderArenaDetails(game);
  }

  /**
   * Render Arena Meta Cards (Controls, About, Recommendations)
   */
  function renderArenaDetails(game) {
    // 1. Controls list
    const controlsList = document.getElementById('arenaControlsList');
    if (controlsList) {
      const controls = getNormalizedControls(game);
      controlsList.innerHTML = controls.map(c => `
        <div class="control-item">
          <span class="keycap">${escapeHtml(c.key)}</span>
          <span class="control-action">${escapeHtml(c.action)}</span>
        </div>
      `).join('');
    }

    // 2. About & Features
    const aboutText = document.getElementById('arenaAboutText');
    if (aboutText) aboutText.textContent = getLocalizedDescription(game);

    const featuresList = document.getElementById('arenaFeaturesList');
    if (featuresList) {
      const features = getLocalizedFeatures(game);
      featuresList.innerHTML = features.map(f => `<li>${escapeHtml(f)}</li>`).join('');
    }

    const devName = document.getElementById('arenaDevName');
    if (devName) {
      devName.textContent = (AppState.lang === 'en' && game.developerEn) ? game.developerEn : (game.developer || 'Claude Fable 5.2 Studio');
    }

    const aiEngineEl = document.getElementById('arenaAiEngine');
    if (aiEngineEl) {
      aiEngineEl.textContent = game.aiEngine || 'Claude Fable 5.2';
    }

    const relDate = document.getElementById('arenaReleaseDate');
    if (relDate) relDate.textContent = game.releaseDate || '2024-11';

    // 3. Like button
    const likeBtn = document.getElementById('btnVoteLike');
    const countEl = document.getElementById('voteLikeCount');
    if (likeBtn && countEl) {
      const isLiked = AppState.isLiked(game.id);
      likeBtn.classList.toggle('voted', isLiked);
      const baseLikes = game.ratingCount ? Math.floor(game.ratingCount / 10) : 1542;
      countEl.textContent = isLiked ? baseLikes + 1 : baseLikes;
    }

    // 4. Recommended list
    const recList = document.getElementById('recommendedList');
    if (recList && window.GAMES_DATA) {
      const recs = window.GAMES_DATA.getRecommendations(game.id, 5);
      recList.innerHTML = recs.map(r => `
        <div class="recommended-card" data-rec-id="${r.id}">
          <img class="recommended-thumb" src="${r.cover || window.GAMES_DATA.defaultCover}" alt="${escapeHtml(getLocalizedTitle(r))}">
          <div class="recommended-info">
            <h4 class="recommended-title">${escapeHtml(getLocalizedTitle(r))}</h4>
            <div class="recommended-meta">
              <span style="color: var(--neon-cyan);">${escapeHtml(getLocalizedCategory(r))}</span>
              <span>★ ${r.rating}</span>
            </div>
          </div>
        </div>
      `).join('');

      recList.querySelectorAll('.recommended-card').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.recId;
          window.location.hash = `#/play/${id}`;
        });
      });
    }
  }

  /**
   * Exit Arena & Return to Lobby View
   */
  function exitArena() {
    const lobbyView = document.getElementById('lobbyView');
    const arenaView = document.getElementById('arenaView');
    const iframe = document.getElementById('gameIframe');

    if (arenaView) arenaView.classList.remove('active');
    if (lobbyView) lobbyView.classList.remove('hidden');

    // Pause / unload iframe without polluting browser session history
    if (iframe) {
      try {
        if (iframe.contentWindow && iframe.contentWindow.location && typeof iframe.contentWindow.location.replace === 'function') {
          iframe.contentWindow.location.replace('about:blank');
        } else {
          iframe.src = 'about:blank';
        }
      } catch (e) {
        iframe.src = 'about:blank';
      }
    }
    AppState.currentGame = null;
  }

  /* ========================================================================
     5. Live Real-time Search Handler
     ======================================================================== */
  function setupSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown || !window.GAMES_DATA) return;

    let selectedIndex = -1;

    function doSearch(query) {
      const q = query.trim();
      if (!q) {
        dropdown.classList.remove('active');
        clearBtn.classList.remove('visible');
        return;
      }
      clearBtn.classList.add('visible');
      const results = window.GAMES_DATA.search(q);

      if (results.length === 0) {
        dropdown.innerHTML = `<div class="search-empty-dropdown">${t('noGamesFound')}</div>`;
      } else {
        dropdown.innerHTML = results.map((game, idx) => `
          <div class="search-item" data-search-id="${game.id}" data-index="${idx}">
            <img class="search-item-thumb" src="${game.cover || window.GAMES_DATA.defaultCover}" alt="${escapeHtml(getLocalizedTitle(game))}">
            <div class="search-item-info">
              <div class="search-item-title">${escapeHtml(getLocalizedTitle(game))}</div>
              <div class="search-item-meta">
                <span>${escapeHtml(getLocalizedCategory(game))}</span>
                <span>★ ${game.rating}</span>
                <span>👁️ ${game.plays || ''}</span>
              </div>
            </div>
          </div>
        `).join('');

        dropdown.querySelectorAll('.search-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.dataset.searchId;
            dropdown.classList.remove('active');
            window.location.hash = `#/play/${id}`;
          });
        });
      }

      dropdown.classList.add('active');
      selectedIndex = -1;
    }

    input.addEventListener('input', (e) => {
      doSearch(e.target.value);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      dropdown.classList.remove('active');
      clearBtn.classList.remove('visible');
      AppState.searchQuery = '';
      renderGamesGrid();
    });

    input.addEventListener('keydown', (e) => {
      const items = dropdown.querySelectorAll('.search-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length > 0) {
          selectedIndex = (selectedIndex + 1) % items.length;
          items.forEach((it, idx) => it.classList.toggle('selected', idx === selectedIndex));
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length > 0) {
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          items.forEach((it, idx) => it.classList.toggle('selected', idx === selectedIndex));
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        } else if (input.value.trim()) {
          AppState.searchQuery = input.value.trim();
          dropdown.classList.remove('active');
          if (AppState.currentGame) {
            exitArena();
          }
          renderGamesGrid();
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('active');
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        dropdown.classList.remove('active');
      }
    });

    // Keyboard shortcut '/' or 'Ctrl+K' / 'Cmd+K'
    document.addEventListener('keydown', (e) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  /* ========================================================================
     6. Hash Router & URL Dispatcher
     ======================================================================== */
  function handleRoute() {
    const hash = window.location.hash || '#/';

    if (hash.startsWith('#/play/')) {
      const gameId = hash.replace('#/play/', '').trim();
      renderArena(gameId);
    } else {
      exitArena();

      if (hash.startsWith('#/category/')) {
        AppState.activeCategory = hash.replace('#/category/', '').trim();
      } else if (hash === '#/favorites') {
        AppState.activeCategory = 'favorites';
      } else {
        AppState.activeCategory = 'all';
      }

      renderCategories();
      renderGamesGrid();
    }
  }

  /* ========================================================================
     7. Interactive Event Bindings
     ======================================================================== */
  function bindGlobalEvents() {
    // 1. Theme toggle
    const themeBtn = document.getElementById('btnThemeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
        AppState.saveTheme();
        applyTheme();
        showToast(AppState.theme === 'dark' ? t('themeDarkToast') : t('themeLightToast'));
      });
    }

    // 2. Language toggle
    const langBtn = document.getElementById('btnLangToggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        AppState.lang = AppState.lang === 'zh' ? 'en' : 'zh';
        AppState.saveLang();
        applyLanguage();
        showToast(AppState.lang === 'zh' ? t('langZhToast') : t('langEnToast'));
      });
    }

    // 3. Random Game button
    const randomBtn = document.getElementById('btnRandomGame');
    if (randomBtn && window.GAMES_DATA) {
      randomBtn.addEventListener('click', () => {
        const games = window.GAMES_DATA.getAll();
        if (games.length === 0) return;
        const randomIdx = Math.floor(Math.random() * games.length);
        const target = games[randomIdx];
        window.location.hash = `#/play/${target.id}`;
      });
    }

    // 4. Favorites filter button in header
    const favHeaderBtn = document.getElementById('btnFavorites');
    if (favHeaderBtn) {
      favHeaderBtn.addEventListener('click', () => {
        window.location.hash = '#/favorites';
      });
    }

    // 5. Browser Fullscreen toggle
    const fullBtn = document.getElementById('btnFullscreenToggle');
    if (fullBtn) {
      fullBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => console.warn(err));
        } else {
          document.exitFullscreen().catch(err => console.warn(err));
        }
      });
    }

    // 6. Arena: Back to Lobby
    const backBtn = document.getElementById('btnBackLobby');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.hash = '#/';
      });
    }

    // 7. Arena: Theater Mode toggle
    const theaterBtn = document.getElementById('btnTheaterMode');
    const frameContainer = document.getElementById('arenaFrameContainer');
    if (theaterBtn && frameContainer) {
      theaterBtn.addEventListener('click', () => {
        AppState.theaterMode = !AppState.theaterMode;
        frameContainer.classList.toggle('theater-mode', AppState.theaterMode);
        theaterBtn.classList.toggle('active', AppState.theaterMode);
      });
    }

    // 8. Arena: Game Fullscreen
    const fullGameBtn = document.getElementById('btnFullscreenGame');
    if (fullGameBtn && frameContainer) {
      fullGameBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          frameContainer.requestFullscreen().catch(err => console.warn(err));
        } else {
          document.exitFullscreen().catch(err => console.warn(err));
        }
      });
    }

    // 9. Arena: Reload Game
    const reloadBtn = document.getElementById('btnReloadGame');
    const iframe = document.getElementById('gameIframe');
    if (reloadBtn && iframe) {
      reloadBtn.addEventListener('click', () => {
        if (AppState.currentGame) {
          const loadingOverlay = document.getElementById('arenaLoadingOverlay');
          if (loadingOverlay) loadingOverlay.classList.remove('hidden');
          try {
            if (iframe.contentWindow && iframe.contentWindow.location && typeof iframe.contentWindow.location.replace === 'function') {
              iframe.contentWindow.location.replace(AppState.currentGame.fileUrl);
            } else {
              iframe.src = AppState.currentGame.fileUrl;
            }
          } catch (e) {
            iframe.src = AppState.currentGame.fileUrl;
          }
        }
      });
    }

    // 10. Arena: Favorite Game
    const favGameBtn = document.getElementById('btnFavGame');
    const favIcon = document.getElementById('arenaFavIcon');
    if (favGameBtn && favIcon) {
      favGameBtn.addEventListener('click', () => {
        if (!AppState.currentGame) return;
        const favorited = AppState.toggleFavorite(AppState.currentGame.id);
        favGameBtn.classList.toggle('favorited', favorited);
        favIcon.textContent = favorited ? '❤️' : '🤍';
        updateFavoritesCounter();
        showToast(favorited ? t('favAddedToast') : t('favRemovedToast'));
      });
    }

    // 11. Arena: Share Game Link
    const shareBtn = document.getElementById('btnShareGame');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          showToast(t('copiedToast'));
        }).catch(() => {
          // Fallback
          const input = document.createElement('input');
          input.value = url;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          showToast(t('copiedToast'));
        });
      });
    }

    // 12. Arena: Like / Feedback vote
    const voteLikeBtn = document.getElementById('btnVoteLike');
    if (voteLikeBtn) {
      voteLikeBtn.addEventListener('click', () => {
        if (!AppState.currentGame) return;
        const isLiked = AppState.toggleLike(AppState.currentGame.id);
        voteLikeBtn.classList.toggle('voted', isLiked);
        const countEl = document.getElementById('voteLikeCount');
        if (countEl) {
          const baseLikes = AppState.currentGame.ratingCount ? Math.floor(AppState.currentGame.ratingCount / 10) : 1542;
          countEl.textContent = isLiked ? baseLikes + 1 : baseLikes;
        }
        showToast(isLiked ? t('voteSuccessToast') : t('voteRemoveToast'));
      });
    }

    // 13. Feedback tags clicking (handled by renderFeedbackTags)

    // 14. Footer Links
    const footerRandom = document.getElementById('footerRandomLink');
    if (footerRandom && window.GAMES_DATA) {
      footerRandom.addEventListener('click', (e) => {
        e.preventDefault();
        const games = window.GAMES_DATA.getAll();
        if (games.length === 0) return;
        const randomIdx = Math.floor(Math.random() * games.length);
        window.location.hash = `#/play/${games[randomIdx].id}`;
      });
    }

    const footerPrivacy = document.getElementById('footerPrivacyLink');
    if (footerPrivacy) {
      footerPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(t('privacyToast'));
      });
    }

    // 15. Listen to Hash Changes
    window.addEventListener('hashchange', handleRoute);
  }

  /* ========================================================================
     8. Bootstrap Initialization
     ======================================================================== */
  function init() {
    applyTheme();
    updateFavoritesCounter();
    setupSearch();
    bindGlobalEvents();

    // Initial language & render
    applyLanguage();

    // Initial routing
    handleRoute();
  }

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
