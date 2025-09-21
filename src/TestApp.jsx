import { useState } from 'react'

function TestApp() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🎨 Avatar Plus
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Создай свой идеальный аватар
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid white',
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          Тест React: {count} кликов
        </button>
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
          ✨ Сайт для генерации аватарок с ИИ ✨
        </div>
      </div>
    </div>
  )
}

export default TestApp
