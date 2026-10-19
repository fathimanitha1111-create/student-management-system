import React, { useEffect, useRef } from 'react'
import './HeroBackground.css'

export default function HeroBackground({ mousePosition }) {
  const canvasRef = useRef(null)

  // Subtle floating golden dust particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Reduced particle count for maximum performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 18 : 36

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1,
      opacity: Math.random() * 0.6 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Mouse influence
      const mx = mousePosition ? mousePosition.x * 12 : 0
      const my = mousePosition ? mousePosition.y * 12 : 0

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.angle += p.pulseSpeed

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        const currentOpacity = p.opacity + Math.sin(p.angle) * 0.2

        ctx.beginPath()
        ctx.arc(p.x + mx, p.y + my, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 218, 150, ${Math.max(0.05, Math.min(0.85, currentOpacity))})`
        ctx.shadowBlur = p.size > 1.8 ? 10 : 4
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [mousePosition])

  // Dynamic parallax spotlight coordinates
  const spotlightX = 70 + (mousePosition ? mousePosition.x * 4 : 0)
  const spotlightY = 32 + (mousePosition ? mousePosition.y * 4 : 0)

  return (
    <div className="hero-background" aria-hidden="true">
      {/* Deep dark base */}
      <div className="hero-background__base" />

      {/* Cinematic warm amber spotlight behind bottle */}
      <div
        className="hero-background__spotlight"
        style={{
          background: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, 
            rgba(224, 155, 45, 0.24) 0%, 
            rgba(168, 98, 22, 0.16) 28%, 
            rgba(65, 30, 8, 0.1) 50%, 
            transparent 72%)`,
        }}
      />

      {/* Deep mahogany shadow gradient */}
      <div className="hero-background__deep-shadows" />

      {/* Subtle atmospheric mist/smoke layer */}
      <div
        className="hero-background__smoke"
        style={{
          transform: mousePosition
            ? `translate3d(${-mousePosition.x * 15}px, ${-mousePosition.y * 10}px, 0)`
            : 'none',
        }}
      />

      {/* Left side contrast shade ensuring typography readability */}
      <div className="hero-background__left-vignette" />

      {/* Floating golden dust canvas */}
      <canvas ref={canvasRef} className="hero-background__particles" />

      {/* Cinematic subtle film grain */}
      <div className="hero-background__grain" />
    </div>
  )
}
