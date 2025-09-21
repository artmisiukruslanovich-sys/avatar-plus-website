import { motion } from 'framer-motion'
import { Sparkles, Heart, Mail, Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: '#', label: 'Email' }
  ]

  const footerLinks = [
    {
      title: 'Продукт',
      links: [
        { name: 'Генератор', href: '/generator' },
        { name: 'Галерея', href: '/gallery' },
        { name: 'API', href: '#' },
        { name: 'Цены', href: '#' }
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { name: 'Помощь', href: '#' },
        { name: 'Документация', href: '#' },
        { name: 'Обратная связь', href: '#' },
        { name: 'Статус', href: '#' }
      ]
    },
    {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '#' },
        { name: 'Блог', href: '#' },
        { name: 'Карьера', href: '#' },
        { name: 'Пресса', href: '#' }
      ]
    },
    {
      title: 'Правовая информация',
      links: [
        { name: 'Конфиденциальность', href: '#' },
        { name: 'Условия использования', href: '#' },
        { name: 'Лицензии', href: '#' },
        { name: 'Cookies', href: '#' }
      ]
    }
  ]

  return (
    <footer className="relative bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Avatar Plus
              </span>
            </motion.div>
            
            <motion.p
              className="text-white/70 mb-6 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Создавайте уникальные аватарки с помощью искусственного интеллекта. 
              Безграничные возможности для самовыражения.
            </motion.p>

            {/* Социальные сети */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/70 hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Ссылки */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Нижняя часть */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-white/70 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Avatar Plus. Все права защищены.</span>
          </div>

          <div className="flex items-center space-x-2 text-white/70 text-sm">
            <span>Сделано с</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>для творчества</span>
          </div>
        </motion.div>

        {/* Информация о монетизации */}
        <motion.div
          className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-white font-semibold mb-2">💰 Монетизация и реклама</h4>
          <p className="text-white/70 text-sm mb-2">
            Для монетизации сайта рекомендуем использовать:
          </p>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• <strong>Google AdSense</strong> - контекстная реклама</li>
            <li>• <strong>Яндекс.Директ</strong> - реклама для русскоязычной аудитории</li>
            <li>• <strong>Media.net</strong> - альтернатива AdSense</li>
            <li>• <strong>Премиум подписка</strong> - расширенные функции без рекламы</li>
            <li>• <strong>Партнерские программы</strong> - комиссия с продаж инструментов дизайна</li>
          </ul>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
