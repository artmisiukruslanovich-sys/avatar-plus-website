import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { User, Settings, History, Heart, Download, Trash2 } from 'lucide-react'
import AvatarWithText from './AvatarWithText'

const UserProfile = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('history')

  // Демо данные истории пользователя
  const userHistory = [
    {
      id: 1,
      url: '/src/assets/fantasy_avatar_1.png',
      prompt: 'Мистический волшебник с голубыми глазами',
      style: 'fantasy',
      customText: 'Мой Ник',
      textPosition: 'bottom',
      textStyle: 'elegant',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      url: '/src/assets/fantasy_avatar_2.png',
      prompt: 'Эльфийская воительница',
      style: 'fantasy',
      customText: '',
      textPosition: 'bottom',
      textStyle: 'modern',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]

  const tabs = [
    { key: 'history', name: 'История', icon: History },
    { key: 'favorites', name: 'Избранное', icon: Heart },
    { key: 'settings', name: 'Настройки', icon: Settings }
  ]

  if (!currentUser) {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Войдите в аккаунт</h2>
          <p className="text-white/70 mb-6">Для доступа к профилю необходимо войти в систему</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            Войти
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Заголовок профиля */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h1>
                <p className="text-white/70">Участник с {new Date().toLocaleDateString('ru-RU')}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-purple-300">
                    {userHistory.length} аватарок создано
                  </span>
                  <span className="text-sm text-pink-300">
                    0 в избранном
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Навигация по табам */}
          <div className="flex space-x-1 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  variant={activeTab === tab.key ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Контент табов */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">История создания</h2>
                
                {userHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userHistory.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-purple-400/50 transition-all group"
                      >
                        <div className="relative mb-4">
                          <AvatarWithText
                            imageUrl={item.url}
                            text={item.customText}
                            textPosition={item.textPosition}
                            textStyle={item.textStyle}
                            className="w-full aspect-square object-cover rounded-xl"
                          />
                          
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center space-x-3">
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-red-500/20 hover:bg-red-500/30 text-red-300">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-sm line-clamp-2">{item.prompt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full capitalize">
                              {item.style}
                            </span>
                            <span className="text-xs text-white/50">
                              {new Date(item.created_at).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          {item.customText && (
                            <div className="text-xs text-yellow-300">
                              Текст: "{item.customText}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">История пуста</h3>
                    <p className="text-white/70 mb-6">Создайте свою первую аватарку, чтобы она появилась здесь</p>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Создать аватарку
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Избранное пусто</h3>
                <p className="text-white/70">Добавляйте понравившиеся аватарки в избранное</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Настройки профиля</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Имя пользователя
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Публичный профиль</h3>
                      <p className="text-white/60 text-sm">Разрешить другим видеть ваши аватарки</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Включить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Уведомления</h3>
                      <p className="text-white/60 text-sm">Получать уведомления о новых функциях</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Настроить
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Сохранить изменения
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default UserProfile
