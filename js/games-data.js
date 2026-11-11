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
    { id: 'racing', name: '竞速漂移', nameEn: 'Racing & Speed', icon: '🏎️', color: '#3b82f6' },
    { id: 'rpg', name: '角色扮演', nameEn: 'RPG & MOBA', icon: '🛡️', color: '#8b5cf6' },
    { id: 'casual', name: '休闲治愈', nameEn: 'Casual & Relaxing', icon: '🧩', color: '#10b981' },
    { id: 'arcade', name: '经典街机', nameEn: 'Arcade Classics', icon: '👾', color: '#ec4899' }
  ];

  /**
   * Master Games List
   */
  const GAMES = [
    {
      id: 'saltline',
      slug: 'saltline-3a-fps',
      title: 'Saltline · 盐线 (3A第一人称射击)',
      titleEn: 'Saltline: 3A Web FPS',
      category: '动作射击',
      categoryEn: 'Action & Shooting',
      categoryId: 'action',
      tags: ['Claude Fable 5.2', 'AI制作', 'FPS', '3A大作', '第一人称', 'Three.js', '光影画质'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'FPS', '3A Quality', 'Shooter', 'Three.js', 'Raytracing'],
      rating: 4.9,
      ratingCount: 28450,
      plays: '235.8K',
      playsNum: 235800,
      featured: true,
      hot: true,
      isNew: false,
      releaseDate: '2024-11-10',
      developer: 'Claude Fable 5.2 (Anthropic)',
      developerEn: 'Claude Fable 5.2 (Anthropic)',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'games/几猫国产3A大作_V1.html',
      originalUrl: 'https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp',
      cover: 'assets/covers/saltline.svg',
      summary: '由 Claude Fable 5.2 全自动端到端编码生成的 3A 级写实光影码头第一人称射击游戏。',
      summaryEn: 'AAA photorealistic browser FPS set in an industrial container port, 100% crafted end-to-end by Claude Fable 5.2.',
      description: '《Saltline》是 AI 游戏开发史上的标志性里程碑作品。由 Claude Fable 5.2 独立端到端编写生成，涵盖程序化写实集装箱码头、体积雾与柔和阴影、机械瞄具射击手感与动态音效合成。体验震撼的下一代网页端原生 3A 画面。',
      descriptionEn: 'Saltline is a landmark achievement in generative AI game development. Created end-to-end by Claude Fable 5.2, it independently renders procedural port containers, volumetric lighting, PCF soft shadows, realistic recoil kinematics, and synthesized WebAudio.',
      features: [
        '100% 由 Claude Fable 5.2 独立编写的原生 WebGL / Three.js 3A 射击内核',
        '超写实工业集装箱码头微型关卡与动态昼夜天光',
        '真实的枪械后坐力扩散、机械瞄准 (ADS) 与换弹动画',
        'WebAudio 纯合成枪声与环境无线电通讯'
      ],
      featuresEn: [
        '100% End-to-end coded by Claude Fable 5.2 with pure browser WebGL runtime',
        'Photorealistic container seaport arena with dynamic atmospheric lighting',
        'Physical weapon recoil, aim-down-sights (ADS) mechanics and reload cadence',
        'Pure procedural WebAudio sound design with tactical radio chatter'
      ],
      controls: [
        { key: 'W A S D', action: '角色战术跑位移动', actionEn: 'Tactical Movement' },
        { key: '鼠标移动', action: '准星转动与精准瞄准', actionEn: 'Aim View / Reticle' },
        { key: '鼠标左键', action: '开火射击', actionEn: 'Fire Weapon' },
        { key: '鼠标右键', action: '机械瞄具瞄准 (ADS)', actionEn: 'Aim Down Sights' },
        { key: 'R 键', action: '更换弹匣', actionEn: 'Reload Magazine' },
        { key: '空格 Space', action: '跳跃攀爬', actionEn: 'Jump' },
        { key: 'Shift 键', action: '战术冲刺', actionEn: 'Tactical Sprint' },
        { key: 'C 键', action: '下蹲避弹', actionEn: 'Crouch' }
      ]
    },
    {
      id: 'qq-speed-3d',
      slug: 'qq-speed-3d-racing',
      title: 'QQ飞车 3D · 极速漂移',
      titleEn: 'QQ Speed 3D: Drift Racing',
      category: '竞速漂移',
      categoryEn: 'Racing & Speed',
      categoryId: 'racing',
      tags: ['Claude Fable 5.2', 'AI制作', '竞速', 'QQ飞车', '漂移', '3D', '秋名山', '道具赛', '氮气'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'Racing', 'QQ Speed', 'Drifting', '3D Nitro', 'Arcade', 'Multi-Track'],
      rating: 4.9,
      ratingCount: 36200,
      plays: '312.4K',
      playsNum: 312400,
      featured: true,
      hot: true,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Claude Fable 5.2 Studio',
      developerEn: 'Claude Fable 5.2 Studio',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'games/qq-speed-3d.html',
      originalUrl: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/nulojnulwlo/qqfeiche3d/index.html',
      cover: 'assets/covers/qq-speed-3d.svg',
      summary: '由 Claude Fable 5.2 制作的高保真 3D 竞速大作！纯 WebGL 还原 QQ飞车经典地图（11城、爱琴海、金字塔），支持漂移集气与双喷！',
      summaryEn: '100% Crafted by Claude Fable 5.2: High-fidelity 3D browser drift racing homage to QQ Speed with iconic tracks and nitro combos.',
      description: '浏览器里的 3D 竞速盛宴！深度复刻端游 QQ飞车的核心驾驶手感：贴墙漂移、双喷触发、大喷过弯，包含11城、情迷爱琴海、法老金字塔与雪地大冒险多张经典赛道，支持计时赛与道具赛！',
      descriptionEn: 'The definitive 3D browser drift racing homage. Recreates the high-speed thrill of QQ Speed: sharp corner drifts, double boost jets, nitro burst timing across classic maps including 11 City, Aegean Coast, and Pharaoh Pyramids.',
      features: [
        '四张经典端游地图：11城、情迷爱琴海、金字塔与雪地',
        '真实赛车物理与漂移集气系统（小喷、双喷、CW/CWW 进阶喷）',
        '酷炫氮气残影光效与动感 BGM 伴奏'
      ],
      featuresEn: [
        'Four classic tracks: 11 City, Aegean Romance, Pyramids and Snowland',
        'Authentic vehicle dynamics with drift gauge, mini-jet and double-boost combos',
        'Vibrant neon nitro exhaust trails and high-octane racing BGM'
      ],
      controls: [
        { key: '↑ 或 W', action: '油门加速前进', actionEn: 'Accelerate' },
        { key: '↓ 或 S', action: '倒车 / 刹车减速', actionEn: 'Reverse / Brake' },
        { key: '← → 或 A D', action: '方向盘转向', actionEn: 'Steer Left / Right' },
        { key: 'Shift 键', action: '入弯长按漂移集气', actionEn: 'Hold Shift to Drift' },
        { key: 'Ctrl 键 或 空格', action: '释放超级氮气 / 小喷加速', actionEn: 'Nitro Boost / Mini-Jet' },
        { key: 'R 键', action: '车辆脱困快速复位', actionEn: 'Reset Car Position' }
      ]
    },
    {
      id: 'cf-transport-ship',
      slug: 'cf-transport-ship-3d',
      title: '穿越火线 · 运输船 3D',
      titleEn: 'CrossFire: Transport Ship 3D',
      category: '动作射击',
      categoryEn: 'Action & Shooting',
      categoryId: 'action',
      tags: ['Claude Fable 5.2', 'AI制作', 'CF', '穿越火线', '运输船', 'FPS', '团队竞技', '保卫者', '对战'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'CrossFire', 'FPS', 'Transport Ship', 'Team Deathmatch', 'Classic Map', 'Bots'],
      rating: 4.8,
      ratingCount: 31800,
      plays: '278.9K',
      playsNum: 278900,
      featured: true,
      hot: true,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Claude Fable 5.2 Studio',
      developerEn: 'Claude Fable 5.2 Studio',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'games/cf-transport-ship.html',
      originalUrl: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/nulojnulwlo/cf-transport-ship/transport-ship.html',
      cover: 'assets/covers/cf-transport-ship.svg',
      summary: '由 Claude Fable 5.2 打造的经典穿越火线「运输船」3D 原生复刻：团队竞技对决，保卫者 vs 潜伏者！',
      summaryEn: 'Web 3D remake of the iconic CrossFire Transport Ship cargo map, 100% crafted & coded by Claude Fable 5.2.',
      description: '亿万玩家青春记忆重现！穿越火线经典地图「运输船」网页 3D 复刻：红蓝集装箱掩体、中桥对狙、地道奇袭，支持团队竞技阵营选择、高智能 BOT 人机对抗与真实打击击杀反馈！',
      descriptionEn: 'The battle that defined an era. Transport Ship returns in full 3D right inside your browser: container cover shootouts, sniper alley, vent ducts, team deathmatch mechanics with aggressive AI bots.',
      features: [
        '1:1 高保真还原运输船甲板集装箱与通风管道地图结构',
        '多武器随心切换：经典 M4A1、AK47、AWM 狙击枪与军用铁锹',
        '连杀语音播报 (Double Kill / Headshot / Multi Kill)'
      ],
      featuresEn: [
        'Accurate 1:1 scale reproduction of the cargo ship deck and ventilation tunnels',
        'Arsenal of iconic arms: M4A1, AK-47, AWM Sniper rifle and combat knife',
        'Authentic killstreak announcer sound bites (Headshot, Double Kill, Ace)'
      ],
      controls: [
        { key: 'W A S D', action: '战术跑位移动', actionEn: 'Tactical Movement' },
        { key: '鼠标移动', action: '准星瞄准视角', actionEn: 'Aim View / Crosshair' },
        { key: '鼠标左键', action: '开火点射 / 扫射', actionEn: 'Fire Weapon' },
        { key: '鼠标右键', action: '狙击枪开镜 / 重击', actionEn: 'Sniper Scope / Knife Heavy Attack' },
        { key: 'R 键', action: '快速换弹匣', actionEn: 'Reload' },
        { key: '空格 Space', action: '跳跃上集装箱箱顶', actionEn: 'Jump onto Containers' },
        { key: 'Shift 键', action: '静步走 (隐蔽脚步)', actionEn: 'Silent Walk' },
        { key: '1 2 3 4', action: '主武器 / 手枪 / 近战 / 投掷', actionEn: 'Primary / Sidearm / Melee / Grenade' }
      ]
    },
    {
      id: 'black-myth-wukong',
      slug: 'black-myth-destined-one',
      title: '黑神话 · 悟空 (天命人)',
      titleEn: 'Black Myth: Wukong (Destined One)',
      category: '3A冒险',
      categoryEn: '3A Adventure',
      categoryId: 'adventure',
      tags: ['Claude Fable 5.2', 'AI制作', '黑神话', '悟空', '天命人', '金箍棒', '西游', '定身术', '3D'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'Black Myth Wukong', 'Monkey King', 'Destined One', 'Action RPG', 'Soulslike', 'Staff Combos'],
      rating: 4.9,
      ratingCount: 58900,
      plays: '526.1K',
      playsNum: 526100,
      featured: true,
      hot: true,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Claude Fable 5.2 Studio',
      developerEn: 'Claude Fable 5.2 Studio',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'https://wukong.cnmwx.com/',
      originalUrl: 'https://wukong.cnmwx.com/',
      cover: 'assets/covers/black-myth-wukong.svg',
      summary: '由 Claude Fable 5.2 打造的三维西游动作 RPG，扮演天命人，重温六卷西行路。劈棍连击与神通法术！',
      summaryEn: '3D Journey to the West action RPG crafted by Claude Fable 5.2. Play as the Destined One with fluid staff arts and spells.',
      description: '重走西行路，踏碎凌霄！《黑神话 · 悟空 (天命人)》网页高精版还原端游硬核战斗体验：棍法连段行云流水，识破化解强敌招式，施展奇术定身、聚形散气残影与铜头铁臂抵挡万千攻击！',
      descriptionEn: 'Embark on the perilous journey westward. A browser-native soulslike homage to Black Myth: Wukong. Master stance transitions, fluid staff combinations, precision counter-attacks, and mythical Daoist spells.',
      features: [
        '次世代写实中式神话风格场景与雪地、松林材质表现',
        '劈棍法、立棍法与戳棍法自由连段与气力槽管理',
        '经典奇术神通：定身法定怪、聚形散气隐身与安身法阵'
      ],
      featuresEn: [
        'Photorealistic Chinese mythical environments with snow, mud and pine bark shaders',
        'Smash, Pillar, and Thrust staff combat stances with stamina discipline',
        'Signature spells: Immobilize, Cloud Step decoy, and Rock Solid parry'
      ],
      controls: [
        { key: 'W A S D', action: '身形奔跑跑位', actionEn: 'Move & Sprint' },
        { key: '鼠标移动', action: '视角转动与锁定目标', actionEn: 'Camera & Target Lock' },
        { key: '鼠标左键', action: '金箍棒轻击连续技', actionEn: 'Light Attack Combo' },
        { key: '鼠标右键', action: '蓄力重击劈棍 / 识破', actionEn: 'Heavy Stance / See Through' },
        { key: '空格 Space', action: '灵巧残影完美闪避', actionEn: 'Perfect Dodge' },
        { key: '1 2 3 4', action: '定身术 / 聚形散气 / 铜头铁臂', actionEn: 'Cast Mythic Spells' }
      ]
    },
    {
      id: 'black-myth-guanyu',
      slug: 'black-myth-guan-yu',
      title: '黑神话 · 关羽',
      titleEn: 'Black Myth: Guan Yu',
      category: '3A冒险',
      categoryEn: '3A Adventure',
      categoryId: 'adventure',
      tags: ['Claude Fable 5.2', 'AI制作', '黑神话', '关羽', '武圣', '三国', '动作RPG', '刀法', '3D'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'Black Myth', 'Guan Yu', 'Action RPG', 'Soulslike', 'Martial Arts', 'God of War'],
      rating: 4.9,
      ratingCount: 42100,
      plays: '408.6K',
      playsNum: 408600,
      featured: true,
      hot: true,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Claude Fable 5.2 Studio',
      developerEn: 'Claude Fable 5.2 Studio',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'https://ai-native-d9gyz4kr613a26c4f-1344763503.tcloudbaseapp.com/',
      originalUrl: 'https://ai-native-d9gyz4kr613a26c4f-1344763503.tcloudbaseapp.com/',
      cover: 'assets/covers/black-myth-guanyu.svg',
      summary: 'Claude Fable 5.2 制作的三国武圣关羽写实动作独立微游戏，手握青龙偃月刀，施展破风刀气与龙魂斩击！',
      summaryEn: 'Hardcore 3D action web game crafted by Claude Fable 5.2 featuring martial saint Guan Yu.',
      description: '义薄云天，万夫莫敌！化身三国武圣关云长，在肃杀幽暗的战场中力斩强敌。挥舞青龙偃月重刀，破招反制，感受刀刀入肉的硬核动作打击感与气势磅礴的中华武术神韵！',
      descriptionEn: 'The Martial Saint stands undefeated. Step into the armored boots of Guan Yu, the legendary Three Kingdoms general. Wield the Green Dragon Crescent Blade with visceral weight, sweeping cleaves, and counter-strikes.',
      features: [
        '厚重写实的冷兵器打击碰撞反馈与刀锋火花特效',
        '青龙刀气释放、蓄力斩与回身撩刀破防连技',
        '沉浸式中式古风战役视听呈现'
      ],
      featuresEn: [
        'Visceral weapon weight, impact sparks and poise break mechanics',
        'Green dragon blade chi slashes, charge attacks and sweeping parries',
        'Immersive dark ancient Chinese martial atmosphere and soundscapes'
      ],
      controls: [
        { key: 'W A S D', action: '步伐移动与跑位', actionEn: 'Movement' },
        { key: '鼠标移动', action: '调整战场视角', actionEn: 'Camera Orientation' },
        { key: '鼠标左键', action: '偃月刀轻击四段斩', actionEn: 'Light Cleave Combo' },
        { key: '鼠标右键', action: '重刀破阵蓄力斩', actionEn: 'Heavy Blade Strike' },
        { key: '空格 Space', action: '战术滑铲闪避', actionEn: 'Dodge Roll' },
        { key: 'Q / E / R', action: '释放武圣破军绝学', actionEn: 'Martial Special Skills' }
      ]
    },
    {
      id: 'lol-aram',
      slug: 'lol-hextech-aram',
      title: '英雄联盟 · 海克斯大乱斗',
      titleEn: 'League of Legends: Hextech ARAM',
      category: '角色扮演',
      categoryEn: 'RPG & MOBA',
      categoryId: 'rpg',
      tags: ['Claude Fable 5.2', 'AI制作', 'LOL', '英雄联盟', '大乱斗', '嚎哭深渊', '海克斯', 'MOBA', '极地乱斗'],
      tagsEn: ['Claude Fable 5.2', 'AI Crafted', 'League of Legends', 'LOL', 'Hextech ARAM', 'Howling Abyss', 'MOBA'],
      rating: 4.9,
      ratingCount: 49500,
      plays: '489.3K',
      playsNum: 489300,
      featured: true,
      hot: true,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Claude Fable 5.2 Studio',
      developerEn: 'Claude Fable 5.2 Studio',
      aiEngine: 'Claude Fable 5.2',
      fileUrl: 'https://lol.hanyue.io/',
      originalUrl: 'https://lol.hanyue.io/',
      cover: 'assets/covers/lol-aram.svg',
      summary: 'Claude Fable 5.2 制作的嚎哭深渊极地大乱斗！自选英雄、神话装备搭配、抽取海克斯强化符文，极速推塔！',
      summaryEn: 'Howling Abyss Hextech ARAM on the icy bridge, 100% crafted & coded by Claude Fable 5.2.',
      description: '全网爆火的网页端《英雄联盟》同人复刻！在嚎哭深渊冰雪长桥上开启 5v5 爽快推塔对战。不仅完美还原 QWER 英雄核心技能与召唤师闪现雪球，更引入了自走棋式的海克斯强化符文三选一，无限火力极速 CD！',
      descriptionEn: 'The beloved League of Legends ARAM mode recreated in the browser! Clash on the icy bridge of Howling Abyss. Features faithful champion kits (QWER + Summoner Spells), custom mythic shops, and augment drafting cards with ultra-fast cooldowns.',
      features: [
        '丰富热门英雄自选：亚索、金克丝、劫、阿狸等经典招牌角色',
        '海克斯强化符文抽卡系统，自由搭配独创流派',
        '支持国服真人联机房间匹配与智能 AI 人机对决'
      ],
      featuresEn: [
        'Popular champion roster: Yasuo, Jinx, Zed, Ahri and more',
        'RNG Hextech augment cards selection for creative build synergies',
        'Multiplayer lobby matchmaking and offline AI bot skirmishes'
      ],
      controls: [
        { key: '鼠标右键', action: '移动至指定位置 / 攻击敌方单位', actionEn: 'Move / Attack Unit' },
        { key: '鼠标左键', action: '选中单位 / 确认技能指示器释放', actionEn: 'Select / Confirm Ability' },
        { key: 'Q W E R', action: '释放英雄核心四个技能', actionEn: 'Champion Abilities' },
        { key: 'D / F 键', action: '召唤师技能 (闪现/雪球/疾跑)', actionEn: 'Summoner Spells (Flash/Mark)' },
        { key: 'P 键', action: '打开神话装备与海克斯商店', actionEn: 'Open Item Shop' },
        { key: 'Tab 键', action: '查看战绩 KDA 与双方出装', actionEn: 'View Scoreboard / KDA' },
        { key: '1 ~ 7 键', action: '使用主动装备道具 (金身/药水)', actionEn: 'Active Item Slots' }
      ]
    },
    {
      id: 'pelican-bike',
      slug: 'pelican-bike-cruise',
      title: '鹈鹕骑单车 · 沿海追鱼',
      titleEn: 'Pelican on a Bike: Coastline Cruise',
      category: '休闲治愈',
      categoryEn: 'Casual & Relaxing',
      categoryId: 'casual',
      tags: ['鹈鹕', '骑行', '单车', '治愈', '海浪', '追鱼', '3D独立'],
      tagsEn: ['Pelican', 'Bicycle', 'Casual', 'Ocean Waves', 'Sunset', 'Procedural 3D'],
      rating: 4.9,
      ratingCount: 18200,
      plays: '154.2K',
      playsNum: 154200,
      featured: false,
      hot: false,
      isNew: true,
      releaseDate: '2024-11-11',
      developer: 'Eden Creative 实验室',
      fileUrl: 'games/pelican-bike.html',
      originalUrl: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/nulojnulwlo/pelican-bike/index.html',
      cover: 'assets/covers/pelican-bike.svg',
      summary: '一只戴着头盔与围巾的可爱白鹈鹕，骑着复古自行车在唯美的落日海岸线上追逐跃出海面的鱼群，极度治愈！',
      summaryEn: 'A stylish pelican with helmet and scarf riding a vintage bike along a serene coast chasing leaping fish. Pure zen.',
      description: '极富艺术美感的治愈系 3D 休闲漫游作品。戴着飞行头盔与飘逸红围巾的白鹈鹕，骑着复古老式脚踏车，沿海岸公路慢节奏骑行。欣赏实时渲染的 Gerstner 海浪波动、落日晚霞与昼夜流转，享受轻松悠扬的合成音乐。',
      descriptionEn: 'A soul-soothing, visually crafted 3D leisure journey. Guide a charming pelican donned with a retro helmet and flowing wool scarf cycling down the shoreline. Enjoy procedural wave crests, dynamic sunsets, and lofi synthesizers.',
      features: [
        '实时 3D 程序化动画：真实踩踏板 IK 骨骼与围巾布料动态',
        '动态物理海浪、日升日落昼夜光影与跃水飞鱼',
        '治愈减压的合成器氛围音乐与清脆车铃音效'
      ],
      featuresEn: [
        'Procedural IK bicycling motion with wind-reactive fabric scarf physics',
        'Gerstner ocean wave simulation, day-night sun cycle, and leaping fish',
        'Relaxing ambient synthesizer score and interactive bell chime'
      ],
      controls: [
        { key: 'W 或 ↑ 键', action: '踩脚踏板加速骑行', actionEn: 'Pedal Forward' },
        { key: 'A D 或 ← →', action: '左右转向沿海漫游', actionEn: 'Steer Left / Right' },
        { key: '空格 Space', action: '叮咚按响自行车铃铛', actionEn: 'Ring Bicycle Bell' },
        { key: '鼠标拖拽', action: '360° 自由旋转观景镜头', actionEn: 'Orbit Camera' }
      ]
    },
    {
      id: 'elemental-mage',
      slug: 'elemental-mage-battle',
      title: '元素法师 · 火球与闪电',
      titleEn: 'Elemental Mage: Fire & Lightning',
      category: '动作射击',
      categoryEn: 'Action & Shooting',
      categoryId: 'action',
      tags: ['法术', '射击', '连击', '火球', '闪电', '魔法', '连环爆炸'],
      tagsEn: ['Magic', 'Shooter', 'Combos', 'Fireball', 'Lightning', 'Spells', 'Particles'],
      rating: 4.8,
      ratingCount: 11200,
      plays: '86.2K',
      playsNum: 86200,
      featured: false,
      hot: false,
      isNew: false,
      releaseDate: '2024-11-10',
      developer: 'Elemental Forge',
      fileUrl: 'games/elemental-mage.html',
      cover: 'assets/covers/elemental-mage.svg',
      summary: '操控掌控元素的奥术法师，在战场中交织轰击连珠火球与连锁闪电，击退蜂拥而至的怪物浪潮！',
      summaryEn: 'Master elemental forces, casting cascades of scorching fireballs and crackling lightning bolts against endless enemy waves.',
      description: '节奏明快、特效华丽的 2D 俯视角法术弹幕射击游戏。玩家扮演全系奥术大法师，自由切换烈焰爆轰、连锁闪电与极寒冰锥，利用不同元素的相生相克引爆毁灭性的元素反应！',
      descriptionEn: 'High-octane top-down magic shooter. Harness primal elements: ignite flammable trails with fireballs, chain lightning across crowds, and freeze behemoths with glacial spikes.',
      features: [
        '炫目粒子光效与流畅的 60FPS 连击战斗体验',
        '多系法术即时切换：火系爆发、冰系减速与雷系传导',
        '极简按键设计，即开即打'
      ],
      featuresEn: [
        'Vibrant canvas particle visual effects and locked 60FPS combat',
        'Instant elemental switching: Fire explosive, Ice freeze, Lightning chain',
        'Snappy responsive controls for quick play sessions'
      ],
      controls: [
        { key: '鼠标移动', action: '瞄准施法方向', actionEn: 'Aim Spell Direction' },
        { key: '鼠标左键', action: '释放元素法术爆发', actionEn: 'Cast Elemental Burst' },
        { key: '1 2 3 键', action: '切换 烈火 / 寒冰 / 闪电 形态', actionEn: 'Switch Fire / Frost / Lightning' }
      ]
    }
  ];

  /**
   * Default Cover Image Fallback
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
