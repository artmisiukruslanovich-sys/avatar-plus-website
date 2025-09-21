import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Zap, Users, Star } from 'lucide-react'

// Импорт сгенерированных аватарок
import avatar1 from '../assets/fantasy_avatar_1.png'
import avatar2 from '../assets/fantasy_avatar_2.png'
import avatar3 from '../assets/fantasy_avatar_3.png'
import avatar4 from '../assets/fantasy_avatar_4.png'
import avatar5 from '../assets/fantasy_avatar_5.png'

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5]

const Hero = () => {
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentAvatarIndex((prev) => (prev + 1) % avatarImages.length)
        setIsVisible(true)
      }, 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToGenerator = () => {
    const generator = document.getElementById('generator')
    if (generator) {
      generator.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Фоновые аватарки */}
      <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-10 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <img
              src={avatarImages[i % avatarImages.length]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая часть - текст */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm font-medium">
                Новое поколение аватарок
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Avatar Plus
              </span>
              <br />
              <span className="text-white">
                Создай свой
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                идеальный образ
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/70 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Генерируйте уникальные аватарки с помощью ИИ для любых приложений. 
              Множество стилей, безграничные возможности, профессиональное качество.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={scrollToGenerator}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold group"
              >
                Создать аватарку
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Посмотреть галерею
              </Button>
            </motion.div>

            {/* Статистика */}
            <motion.div
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-2 text-white/60">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Мгновенная генерация</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm">10,000+ пользователей</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm">4.9/5 рейтинг</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Правая часть - демо аватарка */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Декоративные элементы */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.2, 0.4]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Главная аватарка */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.img
                      key={currentAvatarIndex}
                      src={avatarImages[currentAvatarIndex]}
                      alt="Demo Avatar"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Индикаторы стилей */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        Стиль: Фэнтези
                      </span>
                      <div className="flex space-x-1">
                        {avatarImages.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === currentAvatarIndex 
                                ? 'bg-purple-400 w-6' 
                                : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Плавающие элементы */}
              <motion.div
                className="absolute top-10 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute bottom-10 -left-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Скролл индикатор */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
