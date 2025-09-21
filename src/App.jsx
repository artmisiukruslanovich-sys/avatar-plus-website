import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import AvatarGenerator from './components/AvatarGenerator'
import Gallery from './components/Gallery'
import UserProfile from './components/UserProfile'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Router>
      <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ${darkMode ? 'dark' : ''}`}>
        <div className="relative min-h-screen">
          {/* Фоновые анимированные частицы */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <Header 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <AvatarGenerator currentUser={currentUser} />
                  <Gallery />
                </>
              } />
              <Route path="/generator" element={<AvatarGenerator currentUser={currentUser} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/profile" element={<UserProfile currentUser={currentUser} />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
