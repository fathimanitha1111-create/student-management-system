import React, { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

/**
 * Luxury Custom Cursor (Gold dot + lagging trailing ring)
 * Automatically hides on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animationFrameId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Smooth lerp for trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Event listeners for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.glass-card--interactive') ||
        target.closest('[data-cursor="interactive"]')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'custom-cursor--visible' : ''} ${isHovered ? 'custom-cursor-dot--hover' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'custom-cursor--visible' : ''} ${isHovered ? 'custom-cursor-ring--hover' : ''} ${isClicking ? 'custom-cursor-ring--click' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
