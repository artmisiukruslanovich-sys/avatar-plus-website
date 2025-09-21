import { useState, useRef, useEffect } from 'react'

function FullFeaturedApp() {
  // Основные состояния
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)
  const [language, setLanguage] = useState('ru')
  const [theme, setTheme] = useState('dark')
  const [userAvatars, setUserAvatars] = useState([])
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [userCredits, setUserCredits] = useState(10)
  const [isPremium, setIsPremium] = useState(false)
  
  // Состояния для новых функций
  const [competitions, setCompetitions] = useState([])
  const [achievements, setAchievements] = useState([])
  const [favorites, setFavorites] = useState([])
  const [collections, setCollections] = useState([])
  const [socialFeed, setSocialFeed] = useState([])
  const [trends, setTrends] = useState([])
  const [templates, setTemplates] = useState([])
  const [nftMarket, setNftMarket] = useState([])

  // Языковые переводы (расширенные)
  const translations = {
    ru: {
      // Основные
      home: 'Главная',
      generator: 'Генератор',
      gallery: 'Галерея',
      profile: 'Профиль',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      
      // Новые функции
      competitions: 'Конкурсы',
      nftMarket: 'NFT Маркет',
      templates: 'Шаблоны',
      trends: 'Тренды',
      social: 'Сообщество',
      achievements: 'Достижения',
      premium: 'Премиум',
      credits: 'Кредиты',
      
      // Генератор
      createAvatar: 'Создать аватарку',
      animatedAvatar: 'Анимированная аватарка',
      avatar3D: '3D аватар',
      massGeneration: 'Массовая генерация',
      aiStyles: 'AI стили',
      seasonalThemes: 'Сезонные темы',
      
      // Социальные
      like: 'Лайк',
      comment: 'Комментарий',
      share: 'Поделиться',
      follow: 'Подписаться',
      rate: 'Оценить',
      
      // Монетизация
      buyCredits: 'Купить кредиты',
      upgradeToPremium: 'Обновить до Премиум',
      referralProgram: 'Реферальная программа',
      sellNFT: 'Продать NFT',
      
      // Инструменты
      batchProcessing: 'Пакетная обработка',
      realTimeFilters: 'Фильтры в реальном времени',
      qrGenerator: 'Генератор QR',
      exportToGames: 'Экспорт в игры',
      
      title: 'Avatar Plus',
      subtitle: 'Создавайте уникальные аватарки с помощью ИИ'
    },
    en: {
      home: 'Home',
      generator: 'Generator',
      gallery: 'Gallery',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      competitions: 'Competitions',
      nftMarket: 'NFT Market',
      templates: 'Templates',
      trends: 'Trends',
      social: 'Community',
      achievements: 'Achievements',
      premium: 'Premium',
      credits: 'Credits',
      createAvatar: 'Create Avatar',
      animatedAvatar: 'Animated Avatar',
      avatar3D: '3D Avatar',
      massGeneration: 'Mass Generation',
      aiStyles: 'AI Styles',
      seasonalThemes: 'Seasonal Themes',
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      follow: 'Follow',
      rate: 'Rate',
      buyCredits: 'Buy Credits',
      upgradeToPremium: 'Upgrade to Premium',
      referralProgram: 'Referral Program',
      sellNFT: 'Sell NFT',
      batchProcessing: 'Batch Processing',
      realTimeFilters: 'Real-time Filters',
      qrGenerator: 'QR Generator',
      exportToGames: 'Export to Games',
      title: 'Avatar Plus',
      subtitle: 'Create unique avatars with AI'
    }
  }

  const t = translations[language] || translations.ru

  // Стили (расширенные)
  const styles = {
    app: {
      minHeight: '100vh',
      background: theme === 'dark' 
        ? `linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)`
        : `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #dee2e6 50%, #ced4da 75%, #adb5bd 100%)`,
      color: theme === 'dark' ? 'white' : '#212529',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    
    header: {
      padding: '1rem 2rem',
      borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(15px)',
      background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    
    logo: {
      fontSize: '1.8rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    
    nav: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    
    modernButton: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
        : 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))',
      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
      color: theme === 'dark' ? 'white' : '#212529',
      padding: '0.6rem 1.2rem',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '0.85rem',
      fontWeight: '500',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    primaryButton: {
      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      border: 'none',
      color: 'white',
      padding: '1rem 2.5rem',
      fontSize: '1.1rem',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: '600',
      boxShadow: '0 10px 40px rgba(255, 107, 107, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
        : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
      padding: '2rem',
      borderRadius: '20px',
      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
      backdropFilter: 'blur(15px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    },
    
    modalContent: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95))'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.95))',
      padding: '3rem',
      borderRadius: '25px',
      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
      backdropFilter: 'blur(20px)',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    
    input: {
      width: '100%',
      padding: '1.2rem',
      fontSize: '1rem',
      borderRadius: '15px',
      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
      color: theme === 'dark' ? 'white' : '#212529',
      marginBottom: '1.5rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    
    adBanner: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
        : 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))',
      border: `2px dashed ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
      borderRadius: '15px',
      padding: '2rem',
      margin: '2rem 0',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
    },
    
    statsCard: {
      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      color: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
    },
    
    achievementBadge: {
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      color: '#333',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-block',
      margin: '0.25rem'
    },
    
    premiumBadge: {
      background: 'linear-gradient(135deg, #8e44ad, #3498db)',
      color: 'white',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.7rem',
      fontWeight: '600',
      display: 'inline-block'
    }
  }

  // Компоненты

  // Рекламный баннер
  const AdBanner = ({ type = 'banner', size = 'medium' }) => (
    <div style={{
      ...styles.adBanner,
      height: size === 'large' ? '200px' : size === 'medium' ? '120px' : '80px'
    }}>
      <h4>🎯 Рекламное место ({type})</h4>
      <p>Ваша реклама здесь</p>
      <small>Google AdSense • Яндекс.Директ • Media.net</small>
    </div>
  )

  // Модальное окно авторизации
  const AuthModal = () => (
    <div style={styles.modal} onClick={() => setShowAuth(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {authMode === 'login' ? t.login : t.register}
        </h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          setCurrentUser({ 
            name: 'Пользователь', 
            email: 'user@example.com',
            level: 1,
            experience: 0,
            joinDate: new Date().toISOString()
          })
          setShowAuth(false)
        }}>
          <input style={styles.input} type="email" placeholder="Email" required />
          <input style={styles.input} type="password" placeholder="Пароль" required />
          {authMode === 'register' && (
            <input style={styles.input} type="password" placeholder="Подтвердите пароль" required />
          )}
          <button type="submit" style={{...styles.primaryButton, width: '100%', marginBottom: '1rem'}}>
            {authMode === 'login' ? t.login : t.register}
          </button>
        </form>
        <p style={{ textAlign: 'center', opacity: 0.8 }}>
          {authMode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            style={{ background: 'none', border: 'none', color: '#4ecdc4', cursor: 'pointer', marginLeft: '0.5rem' }}
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          >
            {authMode === 'login' ? t.register : t.login}
          </button>
        </p>
      </div>
    </div>
  )

  // Главная страница
  const HomePage = () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '800'
        }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.9 }}>
          {t.subtitle}
        </p>
        
        <AdBanner type="hero" size="medium" />
        
        <button 
          style={styles.primaryButton}
          onClick={() => currentUser ? setCurrentPage('generator') : setShowAuth(true)}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)'
            e.target.style.boxShadow = '0 15px 50px rgba(255, 107, 107, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)'
            e.target.style.boxShadow = '0 10px 40px rgba(255, 107, 107, 0.3)'
          }}
        >
          ✨ {t.createAvatar}
        </button>
      </div>

      {/* Статистика */}
      <div style={styles.grid}>
        <div style={styles.statsCard}>
          <h3>1M+</h3>
          <p>Созданных аватарок</p>
        </div>
        <div style={styles.statsCard}>
          <h3>50K+</h3>
          <p>Активных пользователей</p>
        </div>
        <div style={styles.statsCard}>
          <h3>100+</h3>
          <p>AI стилей</p>
        </div>
        <div style={styles.statsCard}>
          <h3>24/7</h3>
          <p>Поддержка</p>
        </div>
      </div>

      {/* Основные функции */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🎭 AI Стили</h3>
          <p>Фэнтези, аниме, реалистичные, киберпанк, стимпанк и многие другие стили</p>
        </div>
        <div style={styles.card}>
          <h3>🎬 Анимированные аватары</h3>
          <p>Создавайте GIF-аватарки с простой анимацией и эффектами</p>
        </div>
        <div style={styles.card}>
          <h3>🎯 3D аватары</h3>
          <p>Объемные аватарки для игр и VR-приложений</p>
        </div>
        <div style={styles.card}>
          <h3>🏆 Конкурсы</h3>
          <p>Участвуйте в еженедельных конкурсах и выигрывайте призы</p>
        </div>
        <div style={styles.card}>
          <h3>💎 NFT Маркет</h3>
          <p>Создавайте и продавайте уникальные NFT аватары</p>
        </div>
        <div style={styles.card}>
          <h3>📱 Мобильное приложение</h3>
          <p>Создавайте аватарки на ходу с нашим мобильным приложением</p>
        </div>
      </div>

      <AdBanner type="features" size="large" />

      {/* Дополнительные возможности */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>⚡ Массовая генерация</h3>
          <p>Создавайте множество вариантов одновременно</p>
        </div>
        <div style={styles.card}>
          <h3>🎨 Редактор изображений</h3>
          <p>Встроенный редактор для обработки фотографий</p>
        </div>
        <div style={styles.card}>
          <h3>📊 Аналитика</h3>
          <p>Подробная статистика и аналитика использования</p>
        </div>
        <div style={styles.card}>
          <h3>🌐 API для разработчиков</h3>
          <p>Интегрируйте наш сервис в свои приложения</p>
        </div>
        <div style={styles.card}>
          <h3>🎮 Экспорт в игры</h3>
          <p>Прямой экспорт аватарок в популярные игры</p>
        </div>
        <div style={styles.card}>
          <h3>📱 QR коды</h3>
          <p>Генерация QR-кодов для быстрого доступа</p>
        </div>
      </div>
    </div>
  )

  // Расширенный генератор
  const GeneratorPage = () => {
    const [prompt, setPrompt] = useState('')
    const [selectedStyle, setSelectedStyle] = useState('fantasy')
    const [avatarType, setAvatarType] = useState('static')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generationCount, setGenerationCount] = useState(1)
    const [useTemplate, setUseTemplate] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState('')

    const styles_list = [
      'fantasy', 'anime', 'realistic', 'cyberpunk', 'steampunk', 
      'cartoon', 'pixel', 'watercolor', 'oil_painting', 'sketch',
      'gothic', 'medieval', 'futuristic', 'retro', 'minimalist'
    ]

    const avatar_types = [
      { id: 'static', name: 'Статичная', cost: 1 },
      { id: 'animated', name: 'Анимированная', cost: 3 },
      { id: '3d', name: '3D аватар', cost: 5 },
      { id: 'nft', name: 'NFT готовая', cost: 10 }
    ]

    const handleGenerate = () => {
      const cost = avatar_types.find(t => t.id === avatarType)?.cost * generationCount
      if (userCredits < cost && !isPremium) {
        alert(`Недостаточно кредитов. Нужно: ${cost}, у вас: ${userCredits}`)
        return
      }

      setIsGenerating(true)
      setTimeout(() => {
        const newAvatars = Array.from({ length: generationCount }, (_, i) => ({
          id: Date.now() + i,
          prompt,
          style: selectedStyle,
          type: avatarType,
          image: `/api/placeholder/300/300?${Date.now() + i}`,
          createdAt: new Date().toISOString(),
          likes: 0,
          views: 0
        }))
        
        setUserAvatars(prev => [...prev, ...newAvatars])
        if (!isPremium) {
          setUserCredits(prev => prev - cost)
        }
        setIsGenerating(false)
        alert(`Создано ${generationCount} аватарок!`)
      }, 3000)
    }

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={styles.card}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            🎨 Генератор аватарок
            {isPremium && <span style={styles.premiumBadge}>PREMIUM</span>}
          </h2>
          
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <span>Кредиты: {userCredits}</span>
            {!isPremium && (
              <button 
                style={{...styles.modernButton, marginLeft: '1rem'}}
                onClick={() => setCurrentPage('premium')}
              >
                💎 {t.upgradeToPremium}
              </button>
            )}
          </div>

          <AdBanner type="generator-top" size="small" />
          
          <input
            style={styles.input}
            type="text"
            placeholder="Опишите желаемую аватарку подробно..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <select
              style={styles.input}
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {styles_list.map(style => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
            
            <select
              style={styles.input}
              value={avatarType}
              onChange={(e) => setAvatarType(e.target.value)}
            >
              {avatar_types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.cost} кредитов)
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input
              style={styles.input}
              type="number"
              min="1"
              max={isPremium ? "20" : "5"}
              value={generationCount}
              onChange={(e) => setGenerationCount(parseInt(e.target.value))}
              placeholder="Количество вариантов"
            />
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={useTemplate}
                onChange={(e) => setUseTemplate(e.target.checked)}
              />
              Использовать шаблон
            </label>
          </div>

          {useTemplate && (
            <select style={styles.input} value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
              <option value="">Выберите шаблон</option>
              <option value="gaming">Игровой персонаж</option>
              <option value="business">Деловой стиль</option>
              <option value="casual">Повседневный</option>
              <option value="fantasy">Фэнтези герой</option>
            </select>
          )}
          
          <button
            style={{
              ...styles.primaryButton,
              width: '100%',
              opacity: isGenerating ? 0.7 : 1,
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? '🔄 Генерация...' : `✨ Создать ${generationCount} аватарок`}
          </button>
          
          <AdBanner type="generator-bottom" size="medium" />
        </div>
      </div>
    )
  }

  // Расширенная галерея
  const GalleryPage = () => {
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [viewMode, setViewMode] = useState('grid')

    const filteredAvatars = userAvatars.filter(avatar => {
      if (filter === 'all') return true
      return avatar.type === filter
    }).sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt)
        case 'popular': return b.likes - a.likes
        default: return 0
      }
    })

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>🖼️ Моя галерея ({userAvatars.length})</h2>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select style={styles.modernButton} value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Все типы</option>
              <option value="static">Статичные</option>
              <option value="animated">Анимированные</option>
              <option value="3d">3D</option>
              <option value="nft">NFT</option>
            </select>
            
            <select style={styles.modernButton} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Новые</option>
              <option value="oldest">Старые</option>
              <option value="popular">Популярные</option>
            </select>
            
            <button
              style={styles.modernButton}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? '📋' : '⊞'}
            </button>
            
            {userAvatars.length > 0 && (
              <button style={styles.primaryButton} onClick={() => alert('Скачивание архива...')}>
                📦 Скачать все
              </button>
            )}
          </div>
        </div>
        
        <AdBanner type="gallery-top" size="medium" />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fill, minmax(250px, 1fr))' 
            : '1fr',
          gap: '1.5rem'
        }}>
          {filteredAvatars.map(avatar => (
            <div key={avatar.id} style={{
              ...styles.card,
              padding: '1.5rem'
            }}>
              <img
                src={avatar.image}
                alt="Avatar"
                style={{ 
                  width: '100%', 
                  height: viewMode === 'grid' ? '200px' : '100px',
                  objectFit: 'cover',
                  borderRadius: '10px', 
                  marginBottom: '1rem' 
                }}
              />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={styles.achievementBadge}>{avatar.type}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  {new Date(avatar.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
                {avatar.prompt}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
                  <span>👁️ {avatar.views}</span>
                  <span>❤️ {avatar.likes}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{...styles.modernButton, padding: '0.5rem'}} title="Скачать">
                    💾
                  </button>
                  <button style={{...styles.modernButton, padding: '0.5rem'}} title="Поделиться">
                    📤
                  </button>
                  <button style={{...styles.modernButton, padding: '0.5rem'}} title="В избранное">
                    ⭐
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAvatars.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
            <h3>Пока нет аватарок</h3>
            <p>Перейдите в генератор, чтобы создать свою первую аватарку</p>
          </div>
        )}
      </div>
    )
  }

  // Страница конкурсов
  const CompetitionsPage = () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🏆 Конкурсы</h2>
      
      <AdBanner type="competitions" size="medium" />
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🎭 Конкурс фэнтези аватаров</h3>
          <p>Создайте лучшую фэнтези аватарку и выиграйте 1000 кредитов!</p>
          <div style={{ marginTop: '1rem' }}>
            <span style={styles.achievementBadge}>До 25 декабря</span>
            <span style={styles.achievementBadge}>127 участников</span>
          </div>
          <button style={{...styles.primaryButton, marginTop: '1rem'}}>
            Участвовать
          </button>
        </div>
        
        <div style={styles.card}>
          <h3>🤖 Киберпанк челлендж</h3>
          <p>Покажите свое видение будущего в стиле киберпанк</p>
          <div style={{ marginTop: '1rem' }}>
            <span style={styles.achievementBadge}>До 30 декабря</span>
            <span style={styles.achievementBadge}>89 участников</span>
          </div>
          <button style={{...styles.primaryButton, marginTop: '1rem'}}>
            Участвовать
          </button>
        </div>
        
        <div style={styles.card}>
          <h3>🎨 Еженедельный конкурс</h3>
          <p>Каждую неделю новая тема и новые призы</p>
          <div style={{ marginTop: '1rem' }}>
            <span style={styles.achievementBadge}>Тема: Зима</span>
            <span style={styles.achievementBadge}>234 участника</span>
          </div>
          <button style={{...styles.primaryButton, marginTop: '1rem'}}>
            Участвовать
          </button>
        </div>
      </div>
    </div>
  )

  // Страница премиум
  const PremiumPage = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={styles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          💎 Avatar Plus Premium
        </h2>
        
        <div style={styles.grid}>
          <div style={{
            ...styles.card,
            background: 'linear-gradient(135deg, #8e44ad, #3498db)',
            color: 'white'
          }}>
            <h3>Месячная подписка</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
              $9.99/мес
            </div>
            <ul style={{ textAlign: 'left', lineHeight: '2' }}>
              <li>✅ Безлимитная генерация</li>
              <li>✅ Все премиум стили</li>
              <li>✅ 3D и анимированные аватары</li>
              <li>✅ Приоритетная поддержка</li>
              <li>✅ Без рекламы</li>
            </ul>
            <button style={{...styles.primaryButton, marginTop: '1rem', background: 'white', color: '#8e44ad'}}>
              Подписаться
            </button>
          </div>
          
          <div style={styles.card}>
            <h3>Покупка кредитов</h3>
            <div style={{ margin: '1rem 0' }}>
              <button style={{...styles.modernButton, margin: '0.5rem', display: 'block', width: '100%'}}>
                100 кредитов - $4.99
              </button>
              <button style={{...styles.modernButton, margin: '0.5rem', display: 'block', width: '100%'}}>
                500 кредитов - $19.99
              </button>
              <button style={{...styles.modernButton, margin: '0.5rem', display: 'block', width: '100%'}}>
                1000 кредитов - $34.99
              </button>
            </div>
          </div>
        </div>
        
        <AdBanner type="premium" size="large" />
      </div>
    </div>
  )

  // Расширенный профиль
  const ProfilePage = () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="/src/assets/site_avatar.png"
            alt="User Avatar"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              border: '4px solid rgba(255,255,255,0.3)'
            }}
          />
          <h2>{currentUser?.name}</h2>
          <p>{currentUser?.email}</p>
          {isPremium && <span style={styles.premiumBadge}>PREMIUM</span>}
        </div>
        
        <div style={styles.grid}>
          <div style={styles.statsCard}>
            <h3>{userAvatars.length}</h3>
            <p>Созданных аватарок</p>
          </div>
          <div style={styles.statsCard}>
            <h3>{userCredits}</h3>
            <p>Кредитов</p>
          </div>
          <div style={styles.statsCard}>
            <h3>{currentUser?.level || 1}</h3>
            <p>Уровень</p>
          </div>
          <div style={styles.statsCard}>
            <h3>{achievements.length}</h3>
            <p>Достижений</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>🏆 Достижения</h3>
          <div style={{ marginTop: '1rem' }}>
            <span style={styles.achievementBadge}>🎨 Первая аватарка</span>
            <span style={styles.achievementBadge}>🔥 10 аватарок</span>
            <span style={styles.achievementBadge}>⭐ Популярный автор</span>
            <span style={styles.achievementBadge}>🏆 Победитель конкурса</span>
          </div>
        </div>
        
        <AdBanner type="profile" size="small" />
      </div>
    </div>
  )

  // Рендер страниц
  const renderPage = () => {
    if (!currentUser && ['generator', 'gallery', 'profile', 'competitions', 'premium'].includes(currentPage)) {
      return <HomePage />
    }
    
    switch(currentPage) {
      case 'generator': return <GeneratorPage />
      case 'gallery': return <GalleryPage />
      case 'profile': return <ProfilePage />
      case 'competitions': return <CompetitionsPage />
      case 'premium': return <PremiumPage />
      default: return <HomePage />
    }
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img 
            src="/src/assets/site_avatar.png" 
            alt="Logo" 
            style={{width: '40px', height: '40px', borderRadius: '50%'}} 
          />
          {t.title}
        </div>
        
        <nav style={styles.nav}>
          {/* Переключатель темы */}
          <button
            style={styles.modernButton}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          {/* Выбор языка */}
          <select
            style={styles.modernButton}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">🇷🇺</option>
            <option value="en">🇺🇸</option>
          </select>
          
          {/* Навигация */}
          {[
            { key: 'home', label: t.home, icon: '🏠' },
            { key: 'generator', label: t.generator, icon: '🎨' },
            { key: 'gallery', label: t.gallery, icon: '🖼️' },
            { key: 'competitions', label: t.competitions, icon: '🏆' },
            { key: 'premium', label: t.premium, icon: '💎' },
            { key: 'profile', label: t.profile, icon: '👤' }
          ].map(item => (
            <button
              key={item.key}
              style={{
                ...styles.modernButton,
                background: currentPage === item.key 
                  ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' 
                  : styles.modernButton.background
              }}
              onClick={() => setCurrentPage(item.key)}
            >
              {item.icon} {item.label}
            </button>
          ))}
          
          {/* Авторизация */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem' }}>
                💰 {userCredits}
              </span>
              <button
                style={styles.modernButton}
                onClick={() => setCurrentUser(null)}
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <button
              style={styles.primaryButton}
              onClick={() => setShowAuth(true)}
            >
              {t.login}
            </button>
          )}
        </nav>
      </header>
      
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {renderPage()}
      </main>
      
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <AdBanner type="footer-main" size="large" />
        
        <div style={styles.grid}>
          <div>
            <h4>Продукт</h4>
            <p>Генератор аватарок</p>
            <p>Мобильное приложение</p>
            <p>API для разработчиков</p>
          </div>
          <div>
            <h4>Сообщество</h4>
            <p>Discord</p>
            <p>Telegram</p>
            <p>Reddit</p>
          </div>
          <div>
            <h4>Поддержка</h4>
            <p>Центр помощи</p>
            <p>Обратная связь</p>
            <p>Статус сервиса</p>
          </div>
          <div>
            <h4>Компания</h4>
            <p>О нас</p>
            <p>Карьера</p>
            <p>Пресс-кит</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
          <p>© 2025 Avatar Plus. Все права защищены.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
            💰 Рекламные партнеры: Google AdSense, Яндекс.Директ, Media.net, Facebook Ads
          </p>
        </div>
      </footer>
      
      {showAuth && <AuthModal />}
    </div>
  )
}

export default FullFeaturedApp
