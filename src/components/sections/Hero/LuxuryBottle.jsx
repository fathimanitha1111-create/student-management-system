import React, { useRef } from 'react'
import './LuxuryBottle.css'

/**
 * LuxuryBottle Component for Santuara
 * Handles 3D perspective, interactive mouse tilt, and scroll-driven GSAP transformations.
 */
export default function LuxuryBottle({ mousePosition, scrollProgress = 0, bottleRef }) {
  const containerRef = useRef(null)

  // Smooth mouse tilt angles (kept gentle and luxurious)
  const tiltX = mousePosition ? mousePosition.y * -9 : 0
  const tiltY = mousePosition ? mousePosition.x * 12 : 0
  const transX = mousePosition ? mousePosition.x * 14 : 0
  const transY = mousePosition ? mousePosition.y * 10 : 0

  // Scroll 3D effect transformations:
  // 1. Slow rotation around Y axis
  // 2. Moves slightly toward center (negative X)
  // 3. Scales slightly (1.0 to 1.06)
  // 4. Light shift across surface
  const scrollRotateY = scrollProgress * 18
  const scrollTranslateX = -scrollProgress * 90
  const scrollScale = 1 + scrollProgress * 0.06

  const totalTransform = `
    translate3d(${transX + scrollTranslateX}px, ${transY}px, 0px)
    rotateX(${tiltX}deg)
    rotateY(${tiltY + scrollRotateY}deg)
    scale(${scrollScale})
  `.trim()

  return (
    <div
      ref={containerRef}
      className="luxury-bottle-stage"
      aria-label="Santuara Luxury Flacon Presentation"
    >
      {/* Ambient warm golden halo behind bottle */}
      <div
        className="luxury-bottle__ambient-glow"
        style={{
          transform: `scale(${1 + scrollProgress * 0.15}) translate3d(${transX * 0.5}px, ${transY * 0.5}px, 0)`,
        }}
      />

      {/* Main 3D Bottle Wrapper */}
      <div
        ref={bottleRef}
        className="luxury-bottle__3d-wrap"
        style={{
          transform: totalTransform,
        }}
      >
        {/* Real Perfume Bottle Image with High-End Lighting & Textures */}
        <div className="luxury-bottle__image-container">
          <img
            src="/images/santuara_bottle.jpg"
            alt="Santuara Haute Parfumerie Flacon"
            className="luxury-bottle__image"
            loading="eager"
            draggable="false"
          />

          {/* Dynamic golden light sweep across the bottle */}
          <div
            className="luxury-bottle__light-sweep"
            style={{
              transform: `translateX(${-100 + scrollProgress * 220 + (mousePosition ? mousePosition.x * 50 : 0)}%)`,
            }}
          />

          {/* Glass specular sheen overlay */}
          <div className="luxury-bottle__glass-sheen" />

          {/* Ethereal golden fragrance aura mist */}
          <div
            className="luxury-bottle__mist-veil"
            style={{
              opacity: 0.75 + Math.sin(scrollProgress * Math.PI) * 0.25,
            }}
          />
        </div>

        {/* Cinematic base reflection / shadow onto dark volcanic stone */}
        <div className="luxury-bottle__base-shadow" />
      </div>
    </div>
  )
}
