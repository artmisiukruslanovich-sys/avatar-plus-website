import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Heart, Download, Eye, Filter } from 'lucide-react'
import AvatarWithText from './AvatarWithText'

// Демо данные для галереи
const demoGalleryItems = [
  {
    id: 1,
    url: '/src/assets/fantasy_avatar_1.png',
    prompt: 'Мистический волшебник с голубыми глазами',
    style: 'fantasy',
    customText: 'Мерлин',
    textPosition: 'bottom',
    textStyle: 'elegant',
    likes: 42,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    url: '/src/assets/fantasy_avatar_2.png',
    prompt: 'Эльфийская воительница с луком',
    style: 'fantasy',
    customText: 'Лэголас',
    textPosition: 'bottom-right',
    textStyle: 'modern',
    likes: 38,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    url: '/src/assets/fantasy_avatar_3.png',
    prompt: 'Темный лорд демонов',
    style: 'fantasy',
    customText: 'Диабло',
    textPosition: 'center',
    textStyle: 'bold',
    likes: 55,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    url: '/src/assets/fantasy_avatar_4.png',
    prompt: 'Милая аниме девочка с кошачьими ушками',
    style: 'anime',
    customText: 'Нэко-чан',
    textPosition: 'top',
    textStyle: 'handwritten',
    likes: 67,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    url: '/src/assets/fantasy_avatar_5.png',
    prompt: 'Киберпанк воин будущего',
    style: 'cyberpunk',
    customText: 'CyberNinja',
    textPosition: 'bottom',
    textStyle: 'neon',
    likes: 29,
    created_at: new Date().toISOString()
  }
]

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState(demoGalleryItems)
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [sortBy, setSortBy] = useState('likes')

  const styles = [
    { key: 'all', name: 'Все стили' },
    { key: 'fantasy', name: 'Фэнтези' },
    { key: 'anime', name: 'Аниме' },
    { key: 'cyberpunk', name: 'Киберпанк' },
    { key: 'realistic', name: 'Реалистичный' },
    { key: 'cartoon', name: 'Мультяшный' }
  ]

  const filteredItems = galleryItems
    .filter(item => selectedStyle === 'all' || item.style === selectedStyle)
    .sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'recent') return new Date(b.created_at) - new Date(a.created_at)
      return 0
    })

  const handleLike = (id) => {
    setGalleryItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, likes: item.likes + 1 }
          : item
      )
    )
  }

  return (
    <section className="py-20 relative">
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
              Галерея аватарок
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Вдохновляйтесь работами других пользователей и делитесь своими творениями
          </p>
        </motion.div>

        {/* Фильтры */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-purple-400" />
            <span className="text-white/70 text-sm">Фильтр:</span>
          </div>
          
          {styles.map((style) => (
            <Button
              key={style.key}
              onClick={() => setSelectedStyle(style.key)}
              variant={selectedStyle === style.key ? "default" : "outline"}
              size="sm"
              className={selectedStyle === style.key 
                ? "bg-purple-500 hover:bg-purple-600 text-white" 
                : "border-white/20 text-white/70 hover:text-white hover:bg-white/10"
              }
            >
              {style.name}
            </Button>
          ))}

          <div className="flex items-center space-x-2 ml-4">
            <span className="text-white/70 text-sm">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/20 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="likes">По лайкам</option>
              <option value="recent">По дате</option>
            </select>
          </div>
        </motion.div>

        {/* Сетка галереи */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-purple-400/50 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative mb-4">
                <AvatarWithText
                  imageUrl={item.url}
                  text={item.customText}
                  textPosition={item.textPosition}
                  textStyle={item.textStyle}
                  className="w-full aspect-square object-cover rounded-xl"
                />
                
                {/* Оверлей с действиями */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-3">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleLike(item.id)}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Информация */}
              <div className="space-y-2">
                <p className="text-white/80 text-sm line-clamp-2">
                  {item.prompt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full capitalize">
                    {item.style}
                  </span>
                  <div className="flex items-center space-x-1 text-pink-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{item.likes}</span>
                  </div>
                </div>

                {item.customText && (
                  <div className="text-xs text-yellow-300">
                    Текст: "{item.customText}"
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Кнопка загрузить еще */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
          >
            Загрузить еще
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
