import { useState, useRef, useEffect } from 'react'

function EnhancedApp() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)
  const [language, setLanguage] = useState('ru')
  const [userAvatars, setUserAvatars] = useState([])
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const canvasRef = useRef(null)

  // Языковые переводы
  const translations = {
    ru: {
      home: 'Главная',
      generator: 'Генератор',
      gallery: 'Галерея',
      profile: 'Профиль',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      createAvatar: 'Создать аватарку',
      downloadAll: 'Скачать все',
      uploadPhoto: 'Загрузить фото',
      editPhoto: 'Редактировать',
      title: 'Avatar Plus',
      subtitle: 'Создавайте уникальные аватарки с помощью ИИ',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      adSpace: 'Рекламное место'
    },
    en: {
      home: 'Home',
      generator: 'Generator',
      gallery: 'Gallery',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      createAvatar: 'Create Avatar',
      downloadAll: 'Download All',
      uploadPhoto: 'Upload Photo',
      editPhoto: 'Edit Photo',
      title: 'Avatar Plus',
      subtitle: 'Create unique avatars with AI',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      adSpace: 'Ad Space'
    },
    es: {
      home: 'Inicio',
      generator: 'Generador',
      gallery: 'Galería',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      createAvatar: 'Crear Avatar',
      downloadAll: 'Descargar Todo',
      uploadPhoto: 'Subir Foto',
      editPhoto: 'Editar Foto',
      title: 'Avatar Plus',
      subtitle: 'Crea avatares únicos con IA',
      email: 'Correo',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      adSpace: 'Espacio Publicitario'
    }
  }

  const t = translations[language]

  const styles = {
    app: {
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="avatars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="8" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23avatars)"/></svg>')
      `,
      color: 'white',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundAvatars: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      opacity: 0.1,
      display: 'flex',
      flexWrap: 'wrap',
      animation: 'float 20s ease-in-out infinite'
    },
    header: {
      padding: '1rem 2rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      background: 'rgba(0,0,0,0.3)'
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
    logoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem'
    },
    nav: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    modernButton: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      padding: '0.7rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '0.9rem',
      fontWeight: '500',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    },
    activeButton: {
      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
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
    languageSelector: {
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '15px',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)'
    },
    main: {
      padding: '2rem',
      textAlign: 'center',
      position: 'relative'
    },
    hero: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '4rem 0'
    },
    title: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: '800',
      textShadow: '0 0 30px rgba(255, 107, 107, 0.3)'
    },
    subtitle: {
      fontSize: '1.4rem',
      marginBottom: '3rem',
      opacity: 0.9,
      lineHeight: '1.6'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginTop: '4rem'
    },
    feature: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      padding: '2.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    generator: {
      maxWidth: '700px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      padding: '3rem',
      borderRadius: '25px',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    input: {
      width: '100%',
      padding: '1.2rem',
      fontSize: '1rem',
      borderRadius: '15px',
      border: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      marginBottom: '1.5rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    fileInput: {
      display: 'none'
    },
    fileInputLabel: {
      display: 'inline-block',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #45b7d1, #96ceb4)',
      color: 'white',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '1rem'
    },
    canvas: {
      maxWidth: '100%',
      border: '2px solid rgba(255,255,255,0.2)',
      borderRadius: '15px',
      marginBottom: '1rem'
    },
    adBanner: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      border: '2px dashed rgba(255,255,255,0.3)',
      borderRadius: '15px',
      padding: '2rem',
      margin: '2rem 0',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      color: 'rgba(255,255,255,0.7)'
    },
    avatarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    avatarCard: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
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
      background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95))',
      padding: '3rem',
      borderRadius: '25px',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(20px)',
      maxWidth: '400px',
      width: '90%'
    }
  }

  // Компонент авторизации
  const AuthModal = () => (
    <div style={styles.modal} onClick={() => setShowAuth(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {authMode === 'login' ? t.login : t.register}
        </h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          setCurrentUser({ name: 'Пользователь', email: 'user@example.com' })
          setShowAuth(false)
        }}>
          <input
            style={styles.input}
            type="email"
            placeholder={t.email}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder={t.password}
            required
          />
          {authMode === 'register' && (
            <input
              style={styles.input}
              type="password"
              placeholder={t.confirmPassword}
              required
            />
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

  // Рекламный баннер
  const AdBanner = ({ type = 'banner', size = 'medium' }) => (
    <div style={{
      ...styles.adBanner,
      height: size === 'large' ? '200px' : size === 'medium' ? '120px' : '80px'
    }}>
      <h4>{t.adSpace} ({type})</h4>
      <p>Место для вашей рекламы</p>
      <small>Google AdSense • Яндекс.Директ • Media.net</small>
    </div>
  )

  // Главная страница
  const HomePage = () => (
    <div style={styles.hero}>
      <h1 style={styles.title}>{t.title}</h1>
      <p style={styles.subtitle}>{t.subtitle}</p>
      
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
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>🎭 Все стили</h3>
          <p>Фэнтези, аниме, реалистичные, киберпанк и многие другие</p>
        </div>
        <div style={styles.feature}>
          <h3>📸 Загрузка фото</h3>
          <p>Загружайте свои фотографии и редактируйте их</p>
        </div>
        <div style={styles.feature}>
          <h3>✏️ Редактор</h3>
          <p>Встроенный редактор для обработки изображений</p>
        </div>
        <div style={styles.feature}>
          <h3>💾 Скачивание</h3>
          <p>Скачивайте все созданные аватарки одним архивом</p>
        </div>
      </div>
      
      <AdBanner type="footer" size="large" />
    </div>
  )

  // Генератор аватарок
  const GeneratorPage = () => {
    const [prompt, setPrompt] = useState('')
    const [uploadedImage, setUploadedImage] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const fileInputRef = useRef(null)

    const handleFileUpload = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => setUploadedImage(e.target.result)
        reader.readAsDataURL(file)
      }
    }

    const handleGenerate = () => {
      setIsGenerating(true)
      setTimeout(() => {
        const newAvatar = {
          id: Date.now(),
          prompt,
          image: uploadedImage || '/api/placeholder/300/300',
          createdAt: new Date().toISOString()
        }
        setUserAvatars(prev => [...prev, newAvatar])
        setIsGenerating(false)
        alert('Аватарка создана!')
      }, 2000)
    }

    return (
      <div style={styles.generator}>
        <h2 style={{ marginBottom: '2rem' }}>Генератор аватарок</h2>
        
        <AdBanner type="generator-top" size="small" />
        
        <input
          style={styles.input}
          type="text"
          placeholder="Опишите желаемую аватарку..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <input
          ref={fileInputRef}
          style={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        
        <label
          style={styles.fileInputLabel}
          onClick={() => fileInputRef.current?.click()}
        >
          📸 {t.uploadPhoto}
        </label>
        
        {uploadedImage && (
          <div style={{ marginBottom: '1rem' }}>
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ maxWidth: '200px', borderRadius: '10px' }}
            />
            <br />
            <button
              style={{...styles.modernButton, marginTop: '0.5rem'}}
              onClick={() => {/* Открыть редактор */}}
            >
              ✏️ {t.editPhoto}
            </button>
          </div>
        )}
        
        <button
          style={{
            ...styles.primaryButton,
            opacity: isGenerating ? 0.7 : 1,
            cursor: isGenerating ? 'not-allowed' : 'pointer'
          }}
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? '🔄 Генерация...' : '✨ Создать аватарку'}
        </button>
        
        <AdBanner type="generator-bottom" size="medium" />
      </div>
    )
  }

  // Галерея
  const GalleryPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Мои аватарки ({userAvatars.length})</h2>
        {userAvatars.length > 0 && (
          <button
            style={styles.primaryButton}
            onClick={() => {
              // Логика скачивания всех аватарок
              alert('Скачивание всех аватарок...')
            }}
          >
            📦 {t.downloadAll}
          </button>
        )}
      </div>
      
      <AdBanner type="gallery-top" size="medium" />
      
      <div style={styles.avatarGrid}>
        {userAvatars.map(avatar => (
          <div key={avatar.id} style={styles.avatarCard}>
            <img
              src={avatar.image}
              alt="Avatar"
              style={{ width: '100%', borderRadius: '10px', marginBottom: '1rem' }}
            />
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{avatar.prompt}</p>
            <button
              style={{...styles.modernButton, width: '100%', marginTop: '0.5rem'}}
              onClick={() => {
                // Логика скачивания отдельной аватарки
                const link = document.createElement('a')
                link.href = avatar.image
                link.download = `avatar-${avatar.id}.png`
                link.click()
              }}
            >
              💾 Скачать
            </button>
          </div>
        ))}
      </div>
      
      {userAvatars.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
          <h3>Пока нет созданных аватарок</h3>
          <p>Перейдите в генератор, чтобы создать свою первую аватарку</p>
        </div>
      )}
    </div>
  )

  // Профиль пользователя
  const ProfilePage = () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Профиль пользователя</h2>
      <div style={styles.generator}>
        <img
          src="/src/assets/site_avatar.png"
          alt="User Avatar"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            border: '3px solid rgba(255,255,255,0.3)'
          }}
        />
        <h3>{currentUser?.name}</h3>
        <p>Email: {currentUser?.email}</p>
        <p>Создано аватарок: {userAvatars.length}</p>
        <p>Участник с: {new Date().toLocaleDateString('ru-RU')}</p>
        
        <AdBanner type="profile" size="small" />
      </div>
    </div>
  )

  const renderPage = () => {
    switch(currentPage) {
      case 'generator': return currentUser ? <GeneratorPage /> : <HomePage />
      case 'gallery': return currentUser ? <GalleryPage /> : <HomePage />
      case 'profile': return currentUser ? <ProfilePage /> : <HomePage />
      default: return <HomePage />
    }
  }

  return (
    <div style={styles.app}>
      {/* Анимированный фон с аватарками */}
      <div style={styles.backgroundAvatars}>
        {[1,2,3,4].map(i => (
          <img
            key={i}
            src={`/src/assets/dark_avatar_${i}.png`}
            alt=""
            style={{
              width: '100px',
              height: '100px',
              margin: '2rem',
              borderRadius: '50%',
              animation: `float ${15 + i * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <img src="/src/assets/site_avatar.png" alt="Logo" style={{width: '100%', borderRadius: '50%'}} />
          </div>
          {t.title}
        </div>
        
        <nav style={styles.nav}>
          <select
            style={styles.languageSelector}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">🇷🇺 Русский</option>
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
          </select>
          
          {[
            { key: 'home', label: t.home },
            { key: 'generator', label: t.generator },
            { key: 'gallery', label: t.gallery },
            { key: 'profile', label: t.profile }
          ].map(item => (
            <button
              key={item.key}
              style={{
                ...styles.modernButton,
                ...(currentPage === item.key ? styles.activeButton : {})
              }}
              onClick={() => setCurrentPage(item.key)}
              onMouseOver={(e) => {
                if (currentPage !== item.key) {
                  e.target.style.background = 'rgba(255,255,255,0.2)'
                  e.target.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== item.key) {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                  e.target.style.transform = 'translateY(0)'
                }
              }}
            >
              {item.label}
            </button>
          ))}
          
          {currentUser ? (
            <button
              style={styles.modernButton}
              onClick={() => setCurrentUser(null)}
            >
              {t.logout}
            </button>
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
      
      <main style={styles.main}>
        {renderPage()}
      </main>
      
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <AdBanner type="footer-main" size="large" />
        
        <p style={{ marginTop: '2rem' }}>© 2025 Avatar Plus. Создано для монетизации.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
          💰 Рекламные партнеры: Google AdSense, Яндекс.Директ, Media.net
        </p>
      </footer>
      
      {showAuth && <AuthModal />}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        input::placeholder {
          color: rgba(255,255,255,0.6);
        }
        
        select option {
          background: #1a1a2e;
          color: white;
        }
      `}</style>
    </div>
  )
}

export default EnhancedApp
