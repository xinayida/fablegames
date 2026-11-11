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
      siteTitle: 'FableGames · 潮玩微游戏聚合门户 | 极速即点即玩',
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
      quickTags: ['🔥 3A画面震撼', '⚡ 操作丝滑', '🐱 猫咪太可爱了', '💥 特效拉满', '🏆 满分神作']
    },
    en: {
      siteTitle: 'FableGames · Next-Gen Web Games Aggregation Portal',
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
      quickTags: ['🔥 Visual Masterpiece', '⚡ Butter Smooth', '🐱 Awesome Feline', '💥 Particle Magic', '🏆 10/10 Score']
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
   * Apply Language and translate DOM elements with data-i18n
   */
  function applyLanguage() {
    document.documentElement.lang = AppState.lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('siteTitle');
    const langText = document.getElementById('langText');
    if (langText) {
      langText.textContent = AppState.lang === 'zh' ? 'EN' : '中';
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.placeholder = t('searchPlaceholder');
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && I18N[AppState.lang] && I18N[AppState.lang][key]) {
        el.textContent = I18N[AppState.lang][key];
      }
    });

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

    if (iframe) {
      iframe.onload = () => {
        setTimeout(() => {
          if (loadingOverlay) loadingOverlay.classList.add('hidden');
        }, 400);
      };
      const targetUrl = game.fileUrl;
      const currentLoc = (iframe.contentWindow && iframe.contentWindow.location) ? iframe.contentWindow.location.href : iframe.src;
      if (!currentLoc || !currentLoc.endsWith(targetUrl)) {
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
    if (devName) devName.textContent = game.developer || 'FableGames Studio';

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
        showToast(AppState.theme === 'dark' ? '已切换至暗黑电竞主题' : '已切换至明亮主题');
      });
    }

    // 2. Language toggle
    const langBtn = document.getElementById('btnLangToggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        AppState.lang = AppState.lang === 'zh' ? 'en' : 'zh';
        AppState.saveLang();
        applyLanguage();
        showToast(AppState.lang === 'zh' ? '已切换为中文' : 'Switched to English');
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
        showToast(isLiked ? '感谢点赞！已记录您的评价' : '已取消点赞');
      });
    }

    // 13. Feedback tags clicking
    document.querySelectorAll('#feedbackTags .tag-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        showToast(`已提交反馈: ${btn.textContent.trim()}`);
      });
    });

    // 14. Footer Random Link
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
