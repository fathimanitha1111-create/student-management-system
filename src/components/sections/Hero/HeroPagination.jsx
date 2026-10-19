import React, { useState } from 'react'
import './HeroPagination.css'

export default function HeroPagination() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  return (
    <>
      {/* Bottom-left: 01 ───── 03 */}
      <div className="hero-slide-counter" aria-label="Hero slide indicator">
        <span className="hero-slide-counter__current">01</span>
        <div className="hero-slide-counter__track">
          <div className="hero-slide-counter__progress" />
        </div>
        <span className="hero-slide-counter__total">03</span>
      </div>

      {/* Right side: small vertical pagination dots */}
      <div className="hero-vertical-dots" aria-label="Slide pagination">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === currentSlide
          return (
            <button
              key={index}
              className={`hero-vertical-dots__dot ${isActive ? 'hero-vertical-dots__dot--active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="hero-vertical-dots__inner" />
            </button>
          )
        })}
      </div>
    </>
  )
}
