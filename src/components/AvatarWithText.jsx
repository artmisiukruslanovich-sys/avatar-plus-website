import { useRef, useEffect } from 'react'

const AvatarWithText = ({ 
  imageUrl, 
  text, 
  textPosition = 'bottom', 
  textStyle = 'modern',
  className = '' 
}) => {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  const getTextStyleConfig = (style) => {
    const configs = {
      modern: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 24,
        fontWeight: 'normal',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 2,
        shadow: true
      },
      bold: {
        fontFamily: 'Arial Black, sans-serif',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 3,
        shadow: true
      },
      elegant: {
        fontFamily: 'Georgia, serif',
        fontSize: 22,
        fontWeight: 'normal',
        color: '#f0f0f0',
        strokeColor: '#333333',
        strokeWidth: 1,
        shadow: true
      },
      gaming: {
        fontFamily: 'Impact, sans-serif',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00ff00',
        strokeColor: '#000000',
        strokeWidth: 2,
        shadow: true
      },
      neon: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ffff',
        strokeColor: '#ff00ff',
        strokeWidth: 1,
        shadow: false,
        glow: true
      },
      handwritten: {
        fontFamily: 'Brush Script MT, cursive',
        fontSize: 26,
        fontWeight: 'normal',
        color: '#ffffff',
        strokeColor: '#333333',
        strokeWidth: 1,
        shadow: true
      }
    }
    return configs[style] || configs.modern
  }

  const getTextPosition = (canvas, textWidth, textHeight, position) => {
    const padding = 20
    const positions = {
      'top': { x: canvas.width / 2, y: padding + textHeight },
      'bottom': { x: canvas.width / 2, y: canvas.height - padding },
      'center': { x: canvas.width / 2, y: canvas.height / 2 },
      'top-left': { x: padding + textWidth / 2, y: padding + textHeight },
      'top-right': { x: canvas.width - padding - textWidth / 2, y: padding + textHeight },
      'bottom-left': { x: padding + textWidth / 2, y: canvas.height - padding },
      'bottom-right': { x: canvas.width - padding - textWidth / 2, y: canvas.height - padding }
    }
    return positions[position] || positions.bottom
  }

  const drawTextWithEffects = (ctx, text, x, y, config) => {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`

    // Тень
    if (config.shadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
    }

    // Неоновое свечение
    if (config.glow) {
      ctx.shadowColor = config.color
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    }

    // Обводка
    if (config.strokeWidth > 0) {
      ctx.strokeStyle = config.strokeColor
      ctx.lineWidth = config.strokeWidth
      ctx.strokeText(text, x, y)
    }

    // Основной текст
    ctx.fillStyle = config.color
    ctx.fillText(text, x, y)

    // Сброс эффектов
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  const drawAvatarWithText = () => {
    const canvas = canvasRef.current
    const image = imageRef.current
    
    if (!canvas || !image || !text) return

    const ctx = canvas.getContext('2d')
    
    // Устанавливаем размер canvas равным размеру изображения
    canvas.width = image.naturalWidth || 512
    canvas.height = image.naturalHeight || 512

    // Рисуем изображение
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // Настройки текста
    const config = getTextStyleConfig(textStyle)
    ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`
    
    // Измеряем текст
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const textHeight = config.fontSize

    // Получаем позицию текста
    const position = getTextPosition(canvas, textWidth, textHeight, textPosition)

    // Рисуем полупрозрачный фон под текстом для лучшей читаемости
    const bgPadding = 10
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(
      position.x - textWidth / 2 - bgPadding,
      position.y - textHeight / 2 - bgPadding,
      textWidth + bgPadding * 2,
      textHeight + bgPadding * 2
    )

    // Рисуем текст с эффектами
    drawTextWithEffects(ctx, text, position.x, position.y, config)
  }

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      drawAvatarWithText()
    }
  }, [text, textPosition, textStyle, imageUrl])

  const handleImageLoad = () => {
    drawAvatarWithText()
  }

  if (!text) {
    // Если текста нет, показываем обычное изображение
    return (
      <img
        src={imageUrl}
        alt="Avatar"
        className={className}
      />
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Скрытое изображение для загрузки */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Avatar"
        className="hidden"
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      
      {/* Canvas с текстом */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  )
}

export default AvatarWithText
