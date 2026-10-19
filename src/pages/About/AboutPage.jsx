import React from 'react'
import About from '../../components/sections/About/About'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

export default function AboutPage() {
  return (
    <div className="santuara-page-container" style={{ paddingTop: 'clamp(5rem, 8vh, 7rem)' }}>
      {/* Featured About Presentation */}
      <About />

      {/* Additional Editorial Brand Heritage notes */}
      <div className="santuara-page__inner" style={{ marginTop: '2rem' }}>
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '3rem 2rem',
            background: 'rgba(14, 14, 18, 0.45)',
            border: '1px solid rgba(212, 175, 55, 0.18)',
            borderRadius: '4px',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              01 • NOBLE HARVEST
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: '0.75rem',
                letterSpacing: '0.08em',
              }}
            >
              RARE INGREDIENTS
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Harvested at the peak hour of dawn in Grasse, Madagascar, and the Orient. Every droplet represents the pinnacle of botanical purity.
            </p>
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              02 • ATELIER CRAFT
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: '0.75rem',
                letterSpacing: '0.08em',
              }}
            >
              BESPOKE FLACONS
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Heavy blown obsidian glass sculpted with champagne gold closures, hand-finished to preserve the volatile fragrance oils for decades.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
