import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageInnerRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Subtle parallax on perfume image during scroll
      gsap.fromTo(
        imageInnerRef.current,
        { y: -25, scale: 1.06 },
        {
          y: 25,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      )

      // 2. Coordinated entry animation when About section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Image reveal with mask / clip-path
      tl.fromTo(
        imageWrapRef.current,
        {
          clipPath: 'inset(14% 0% 14% 0%)',
          opacity: 0,
          y: 40,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }
      )

      // Gold label reveal
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.9'
      )

      // Heading reveal
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.7'
      )

      // Decorative gold line expansion
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
        '-=0.6'
      )

      // Editorial paragraphs
      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.5'
      )

      // Button appears last
      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="santuara-about" id="about-section">
      {/* Ambient background glow & atmospheric depth */}
      <div className="santuara-about__ambient-glow" aria-hidden="true" />
      <div className="santuara-about__amber-light" aria-hidden="true" />

      <div className="santuara-about__container">
        {/* ================= LEFT: CINEMATIC PERFUME IMAGE ================= */}
        <div className="santuara-about__image-col">
          <div ref={imageWrapRef} className="santuara-about__image-frame">
            {/* Subtle luxury gold border aura */}
            <div className="santuara-about__frame-border" aria-hidden="true" />

            {/* Glowing spotlight reflection overlay */}
            <div className="santuara-about__image-glow" aria-hidden="true" />

            <div className="santuara-about__image-inner">
              <img
                ref={imageInnerRef}
                src="/images/santuara_about_bottle.jpg"
                alt="Santuara Haute Parfumerie Flacon"
                className="santuara-about__image"
                loading="lazy"
              />
            </div>

            {/* Subtle editorial corner badge */}
            <div className="santuara-about__image-badge">
              <Sparkles size={12} className="santuara-about__badge-sparkle" />
              <span>HAUTE PARFUMERIE</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: EDITORIAL NARRATIVE ================= */}
        <div className="santuara-about__content-col">
          {/* Small gold label */}
          <div ref={labelRef} className="santuara-about__eyebrow-wrap">
            <span className="santuara-about__bullet" aria-hidden="true" />
            <span className="santuara-about__label">THE ESSENCE OF SANTUARA</span>
          </div>

          {/* Large heading */}
          <h2 ref={headingRef} className="santuara-about__heading">
            <span className="santuara-about__heading-primary">MORE THAN A FRAGRANCE.</span>
            <span className="santuara-about__heading-accent font-editorial-italic">
              IT'S A PRESENCE.
            </span>
          </h2>

          {/* Animated luxury champagne gold line */}
          <div ref={lineRef} className="santuara-about__divider" aria-hidden="true" />

          {/* Paragraphs */}
          <div ref={textRef} className="santuara-about__body">
            <p className="santuara-about__paragraph">
              Santuara was created for those who believe fragrance is more than a scent.
              It is an identity, a memory and an unforgettable presence.
            </p>
            <p className="santuara-about__paragraph">
              Every composition is carefully crafted to balance rare ingredients,
              deep character and timeless elegance.
            </p>
          </div>

          {/* CTA Button */}
          <div ref={btnRef} className="santuara-about__cta-wrap">
            <Link to="/about" className="santuara-about__cta-btn">
              <span className="santuara-about__cta-fill" />
              <span className="santuara-about__cta-text">DISCOVER OUR STORY</span>
              <span className="santuara-about__cta-arrow">
                <ArrowRight size={17} strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
