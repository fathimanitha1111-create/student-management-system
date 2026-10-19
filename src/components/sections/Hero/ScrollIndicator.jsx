import React from 'react'
import './ScrollIndicator.css'

export default function ScrollIndicator() {
  const handleScrollClick = () => {
    const nextSection = document.getElementById('about-section') || document.getElementById('featured-collection')
    if (nextSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo(nextSection, { offset: -60, duration: 1.2 })
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div
      className="scroll-indicator"
      onClick={handleScrollClick}
      role="button"
      tabIndex={0}
      aria-label="Scroll down to explore"
    >
      <div className="scroll-indicator__mouse">
        <span className="scroll-indicator__wheel" />
      </div>
      <span className="scroll-indicator__label">SCROLL DOWN</span>
      <div className="scroll-indicator__line-wrap">
        <span className="scroll-indicator__line" />
      </div>
    </div>
  )
}
