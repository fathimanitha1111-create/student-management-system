import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroBackground from './HeroBackground'
import LuxuryBottle from './LuxuryBottle'
import ScrollIndicator from './ScrollIndicator'
import HeroPagination from './HeroPagination'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const bottleWrapRef = useRef(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)

  // Subtle Mouse Parallax Tracking
  useEffect(() => {
    // Skip on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId

    const handleMouseMove = (e) => {
      // Normalize to range [-1, 1]
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    const updateMouse = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setMousePosition({ x: currentX, y: currentY })
      animationFrameId = requestAnimationFrame(updateMouse)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateMouse)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // GSAP 3D Scroll Trigger Experience
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    // Parallax fade and slide for text content
    if (textRef.current) {
      gsap.to(textRef.current, {
        y: 120,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section ref={heroRef} className="santuara-hero" id="home">
      {/* Cinematic Background with dynamic lighting & particles */}
      <HeroBackground mousePosition={mousePosition} />

      {/* Main Hero Container */}
      <div className="santuara-hero__container">
        {/* ================= LEFT SIDE: EDITORIAL TYPOGRAPHY ================= */}
        <div ref={textRef} className="santuara-hero__content">
          {/* Eyebrow / Overline */}
          <div className="santuara-hero__eyebrow-wrap">
            <span className="santuara-hero__bullet" />
            <span className="santuara-hero__eyebrow">SMELL THE EXTRAORDINARY</span>
          </div>

          {/* Major Brand Heading */}
          <h1 className="santuara-hero__brand-title">
            SANTUARA
          </h1>

          {/* Sub-headline */}
          <div className="santuara-hero__subheadline">
            <span className="santuara-hero__sub-line">MORE THAN A FRAGRANCE</span>
            <span className="santuara-hero__sub-line santuara-hero__sub-line--accent font-editorial-italic">
              IT'S A PRESENCE
            </span>
          </div>

          {/* Editorial Paragraph */}
          <p className="santuara-hero__description">
            Crafted for those who leave a lasting impression.
            Santuara is a journey of elegance, mystery and
            timeless beauty.
          </p>

          {/* CTA: EXPLORE COLLECTION → */}
          <div className="santuara-hero__cta-wrap">
            <Link
              to="/collection"
              className="santuara-hero__cta-btn"
              onClick={(e) => {
                const catalogEl = document.getElementById('featured-collection')
                if (catalogEl) {
                  e.preventDefault()
                  if (window.__lenis) {
                    window.__lenis.scrollTo(catalogEl, { offset: -60, duration: 1.2 })
                  } else {
                    catalogEl.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
            >
              <span className="santuara-hero__cta-fill" />
              <span className="santuara-hero__cta-text">EXPLORE COLLECTION</span>
              <span className="santuara-hero__cta-arrow">
                <ArrowRight size={17} strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE: 3D LUXURY BOTTLE ================= */}
        <div className="santuara-hero__visual-wrap">
          <LuxuryBottle
            bottleRef={bottleWrapRef}
            mousePosition={mousePosition}
            scrollProgress={scrollProgress}
          />
        </div>
      </div>

      {/* Bottom Center: Scroll Down Indicator */}
      <ScrollIndicator />

      {/* Bottom Left & Right: Slide Indicators & Pagination */}
      <HeroPagination />
    </section>
  )
}
