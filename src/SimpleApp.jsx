import { useState } from 'react'

function SimpleApp() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState({ name: 'Пользователь' })

  const styles = {
    app: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      padding: '1rem 2rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    nav: {
      display: 'flex',
      gap: '1rem'
    },
    navButton: {
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeNavButton: {
      background: 'rgba(255,255,255,0.3)',
      border: '1px solid rgba(255,255,255,0.5)'
    },
    main: {
      padding: '2rem',
      textAlign: 'center'
    },
    hero: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '4rem 0'
    },
    title: {
      fontSize: '3.5rem',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '1.3rem',
      marginBottom: '2rem',
      opacity: 0.9
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    feature: {
      background: 'rgba(255,255,255,0.1)',
      padding: '2rem',
      borderRadius: '15px',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    button: {
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      border: 'none',
      color: 'white',
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '0.5rem'
    },
    generator: {
      maxWidth: '600px',
      margin: '0 auto',
      background: 'rgba(255,255,255,0.1)',
      padding: '2rem',
      borderRadius: '15px',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    input: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      marginBottom: '1rem'
    },
    select: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      marginBottom: '1rem'
    }
  }

  const HomePage = () => (
    <div style={styles.hero}>
      <h1 style={styles.title}>🎨 Avatar Plus</h1>
      <p style={styles.subtitle}>
        Создавайте уникальные аватарки с помощью искусственного интеллекта
      </p>
      <button 
        style={styles.button}
        onClick={() => setCurrentPage('generator')}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Создать аватарку
      </button>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>🎭 Все стили</h3>
          <p>Фэнтези, аниме, реалистичные, мультяшные и многие другие стили</p>
        </div>
        <div style={styles.feature}>
          <h3>✏️ Добавление текста</h3>
          <p>Добавляйте свой текст, имя или никнейм прямо на аватарку</p>
        </div>
        <div style={styles.feature}>
          <h3>🌍 Мультиязычность</h3>
          <p>Поддержка всех языков мира для удобства пользователей</p>
        </div>
        <div style={styles.feature}>
          <h3>💰 Монетизация</h3>
          <p>Встроенная система рекламы и премиум подписок</p>
        </div>
      </div>
    </div>
  )

  const GeneratorPage = () => {
    const [prompt, setPrompt] = useState('')
    const [style, setStyle] = useState('fantasy')
    const [customText, setCustomText] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = () => {
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        alert(`Аватарка создана!\nСтиль: ${style}\nОписание: ${prompt}\nТекст: ${customText || 'без текста'}`)
      }, 2000)
    }

    return (
      <div style={styles.generator}>
        <h2 style={{ marginBottom: '2rem' }}>Генератор аватарок</h2>
        
        <input
          style={styles.input}
          type="text"
          placeholder="Опишите желаемую аватарку..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <select
          style={styles.select}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="fantasy">Фэнтези</option>
          <option value="anime">Аниме</option>
          <option value="realistic">Реалистичный</option>
          <option value="cartoon">Мультяшный</option>
          <option value="cyberpunk">Киберпанк</option>
        </select>
        
        <input
          style={styles.input}
          type="text"
          placeholder="Текст на аватарке (опционально)"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
        
        <button
          style={{
            ...styles.button,
            opacity: isGenerating ? 0.7 : 1,
            cursor: isGenerating ? 'not-allowed' : 'pointer'
          }}
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? '🔄 Генерация...' : '✨ Создать аватарку'}
        </button>
      </div>
    )
  }

  const GalleryPage = () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Галерея аватарок</h2>
      <div style={styles.features}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={styles.feature}>
            <div style={{
              width: '100px',
              height: '100px',
              background: `linear-gradient(45deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 60%))`,
              borderRadius: '50%',
              margin: '0 auto 1rem'
            }}></div>
            <h4>Аватарка #{i}</h4>
            <p>Пример созданной аватарки</p>
          </div>
        ))}
      </div>
    </div>
  )

  const ProfilePage = () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Профиль пользователя</h2>
      <div style={styles.generator}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem'
        }}>
          👤
        </div>
        <h3>{currentUser.name}</h3>
        <p>Создано аватарок: 5</p>
        <p>Участник с: {new Date().toLocaleDateString('ru-RU')}</p>
      </div>
    </div>
  )

  const renderPage = () => {
    switch(currentPage) {
      case 'generator': return <GeneratorPage />
      case 'gallery': return <GalleryPage />
      case 'profile': return <ProfilePage />
      default: return <HomePage />
    }
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.logo}>
          🎨 Avatar Plus
        </div>
        <nav style={styles.nav}>
          {[
            { key: 'home', label: 'Главная' },
            { key: 'generator', label: 'Генератор' },
            { key: 'gallery', label: 'Галерея' },
            { key: 'profile', label: 'Профиль' }
          ].map(item => (
            <button
              key={item.key}
              style={{
                ...styles.navButton,
                ...(currentPage === item.key ? styles.activeNavButton : {})
              }}
              onClick={() => setCurrentPage(item.key)}
              onMouseOver={(e) => {
                if (currentPage !== item.key) {
                  e.target.style.background = 'rgba(255,255,255,0.2)'
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== item.key) {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      
      <main style={styles.main}>
        {renderPage()}
      </main>
      
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        opacity: 0.8
      }}>
        <p>© 2025 Avatar Plus. Создано для монетизации через рекламу и премиум функции.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          💡 Рекомендуемые рекламные сети: Google AdSense, Яндекс.Директ, Media.net
        </p>
      </footer>
    </div>
  )
}

export default SimpleApp
