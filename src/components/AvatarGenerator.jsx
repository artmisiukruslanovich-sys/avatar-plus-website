import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import AvatarWithText from './AvatarWithText'
import { 
  Wand2, 
  Upload, 
  Download, 
  Share2, 
  Heart,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Settings,
  Loader2,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight
} from 'lucide-react'

const avatarStyles = [
  { key: 'realistic', name: 'Реалистичный', description: 'Фотореалистичные портреты', color: 'from-blue-500 to-cyan-500' },
  { key: 'cartoon', name: 'Мультяшный', description: 'Яркие мультипликационные персонажи', color: 'from-yellow-500 to-orange-500' },
  { key: 'anime', name: 'Аниме', description: 'Стиль японской анимации', color: 'from-pink-500 to-rose-500' },
  { key: 'pixel', name: 'Пиксельный', description: 'Ретро 8-битный стиль', color: 'from-green-500 to-emerald-500' },
  { key: 'fantasy', name: 'Фэнтези', description: 'Магические и мистические образы', color: 'from-purple-500 to-violet-500' },
  { key: 'cyberpunk', name: 'Киберпанк', description: 'Футуристический неоновый стиль', color: 'from-cyan-500 to-blue-500' },
  { key: 'minimalist', name: 'Минимализм', description: 'Простые и чистые формы', color: 'from-gray-500 to-slate-500' },
  { key: 'watercolor', name: 'Акварель', description: 'Художественные мазки кистью', color: 'from-indigo-500 to-purple-500' }
]

const textStyles = [
  { key: 'modern', name: 'Современный', description: 'Чистый современный шрифт' },
  { key: 'bold', name: 'Жирный', description: 'Толстый выразительный текст' },
  { key: 'elegant', name: 'Элегантный', description: 'Изящный декоративный шрифт' },
  { key: 'gaming', name: 'Игровой', description: 'Стиль для геймеров' },
  { key: 'neon', name: 'Неоновый', description: 'Светящийся киберпанк стиль' },
  { key: 'handwritten', name: 'Рукописный', description: 'Имитация рукописного текста' }
]

const textPositions = [
  { key: 'top', name: 'Сверху', icon: AlignCenter },
  { key: 'bottom', name: 'Снизу', icon: AlignCenter },
  { key: 'center', name: 'По центру', icon: AlignCenter },
  { key: 'top-left', name: 'Сверху слева', icon: AlignLeft },
  { key: 'top-right', name: 'Сверху справа', icon: AlignRight },
  { key: 'bottom-left', name: 'Снизу слева', icon: AlignLeft },
  { key: 'bottom-right', name: 'Снизу справа', icon: AlignRight }
]

const AvatarGenerator = ({ currentUser }) => {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('fantasy')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAvatar, setGeneratedAvatar] = useState(null)
  const [referenceImage, setReferenceImage] = useState(null)
  const [customText, setCustomText] = useState('')
  const [textPosition, setTextPosition] = useState('bottom')
  const [textStyle, setTextStyle] = useState('modern')
  const [showTextOptions, setShowTextOptions] = useState(false)
  const fileInputRef = useRef(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    try {
      // Симуляция генерации (в реальном приложении здесь будет API вызов)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Для демонстрации используем одну из наших аватарок
      const demoAvatars = [
        '/src/assets/fantasy_avatar_1.png',
        '/src/assets/fantasy_avatar_2.png',
        '/src/assets/fantasy_avatar_3.png',
        '/src/assets/fantasy_avatar_4.png',
        '/src/assets/fantasy_avatar_5.png'
      ]
      
      setGeneratedAvatar({
        id: Date.now(),
        url: demoAvatars[Math.floor(Math.random() * demoAvatars.length)],
        prompt,
        style: selectedStyle,
        customText: customText.trim(),
        textPosition,
        textStyle,
        created_at: new Date().toISOString()
      })
    } catch (error) {
      console.error('Ошибка генерации:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setReferenceImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    if (generatedAvatar) {
      // Находим canvas с аватаркой
      const canvas = document.querySelector('canvas')
      if (canvas) {
        // Создаем ссылку для скачивания
        const link = document.createElement('a')
        link.download = `avatar-plus-${generatedAvatar.id}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      } else {
        // Если canvas не найден, скачиваем оригинальное изображение
        const link = document.createElement('a')
        link.download = `avatar-plus-${generatedAvatar.id}.png`
        link.href = generatedAvatar.url
        link.click()
      }
    }
  }

  const handleShare = () => {
    if (generatedAvatar) {
      // Логика шаринга
      console.log('Поделиться аватаркой:', generatedAvatar.url)
    }
  }

  return (
    <section id="generator" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Генератор аватарок
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Опишите желаемый образ, выберите стиль и получите уникальную аватарку за секунды
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Левая панель - настройки */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Ввод описания */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Описание аватарки</h3>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Опишите желаемую аватарку: молодая женщина с голубыми глазами, длинными волосами, в фэнтези стиле..."
                className="w-full h-32 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-purple-400 transition-colors"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-white/50">{prompt.length}/500</span>
                <div className="flex items-center space-x-2 text-sm text-white/50">
                  <Sparkles className="w-4 h-4" />
                  <span>Будьте детальными для лучшего результата</span>
                </div>
              </div>
            </div>

            {/* Выбор стиля */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Стиль аватарки</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {avatarStyles.map((style) => (
                  <motion.button
                    key={style.key}
                    onClick={() => setSelectedStyle(style.key)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedStyle === style.key
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${style.color} mb-2`} />
                    <h4 className="font-medium text-white text-sm">{style.name}</h4>
                    <p className="text-xs text-white/60 mt-1">{style.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Пользовательский текст */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Type className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Текст на аватарке</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    Опционально
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTextOptions(!showTextOptions)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Введите текст (имя, никнейм, слоган...)"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors mb-4"
                maxLength={50}
              />
              
              <div className="flex justify-between items-center text-sm text-white/50 mb-4">
                <span>{customText.length}/50</span>
                {customText && (
                  <span className="text-purple-300">✓ Текст будет добавлен</span>
                )}
              </div>

              {/* Расширенные настройки текста */}
              <AnimatePresence>
                {showTextOptions && (
                  <motion.div
                    className="space-y-4 border-t border-white/10 pt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {/* Позиция текста */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Позиция текста</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {textPositions.map((position) => {
                          const Icon = position.icon
                          return (
                            <button
                              key={position.key}
                              onClick={() => setTextPosition(position.key)}
                              className={`p-2 rounded-lg border text-xs transition-all ${
                                textPosition === position.key
                                  ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                              }`}
                            >
                              <Icon className="w-3 h-3 mx-auto mb-1" />
                              {position.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Стиль текста */}
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Стиль текста</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {textStyles.map((style) => (
                          <button
                            key={style.key}
                            onClick={() => setTextStyle(style.key)}
                            className={`p-2 rounded-lg border text-xs text-left transition-all ${
                              textStyle === style.key
                                ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                            }`}
                          >
                            <div className="font-medium">{style.name}</div>
                            <div className="text-xs opacity-60">{style.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Загрузка референса */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Референсное изображение</h3>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                  Опционально
                </span>
              </div>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors"
              >
                {referenceImage ? (
                  <div className="space-y-2">
                    <img
                      src={referenceImage}
                      alt="Reference"
                      className="w-20 h-20 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-white/70">Референс загружен</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="w-8 h-8 text-white/40 mx-auto" />
                    <p className="text-sm text-white/70">Нажмите для загрузки</p>
                    <p className="text-xs text-white/50">PNG, JPG до 10MB</p>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Кнопка генерации */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Генерируем магию...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Создать аватарку
                </>
              )}
            </Button>
          </motion.div>

          {/* Правая панель - результат */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 min-h-[500px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    className="text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-purple-500/20 rounded-full mx-auto" />
                      <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-purple-500 rounded-full mx-auto animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">Создаём вашу аватарку</h3>
                      <p className="text-white/60">Это может занять несколько секунд...</p>
                    </div>
                  </motion.div>
                ) : generatedAvatar ? (
                  <motion.div
                    key="result"
                    className="w-full space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="relative group">
                      <AvatarWithText
                        imageUrl={generatedAvatar.url}
                        text={generatedAvatar.customText}
                        textPosition={generatedAvatar.textPosition}
                        textStyle={generatedAvatar.textStyle}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-4">
                        <Button
                          onClick={handleDownload}
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={handleShare}
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">Стиль:</span>
                        <span className="text-sm text-purple-300 capitalize">{generatedAvatar.style}</span>
                      </div>
                      {generatedAvatar.customText && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Текст:</span>
                          <span className="text-sm text-yellow-300">"{generatedAvatar.customText}"</span>
                        </div>
                      )}
                      {generatedAvatar.customText && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Позиция:</span>
                          <span className="text-sm text-blue-300 capitalize">
                            {textPositions.find(p => p.key === generatedAvatar.textPosition)?.name || generatedAvatar.textPosition}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">Создано:</span>
                        <span className="text-sm text-white/80">
                          {new Date(generatedAvatar.created_at).toLocaleString('ru-RU')}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={handleDownload}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                      <Button
                        onClick={handleShare}
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                      <ImageIcon className="w-16 h-16 text-white/30" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">Ваша аватарка появится здесь</h3>
                      <p className="text-white/60">Заполните описание и нажмите "Создать аватарку"</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AvatarGenerator
