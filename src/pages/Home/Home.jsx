import React from 'react'
import Hero from '../../components/sections/Hero/Hero'
import About from '../../components/sections/About/About'
import FeaturedCollection from '../../components/sections/FeaturedCollection/FeaturedCollection'
import Footer from '../../components/layout/Footer/Footer'

export default function Home() {
  return (
    <div className="santuara-home-page">
      {/* 1. Full-Screen Cinematic Hero Section */}
      <Hero />

      {/* 2. Premium About Santuara Section immediately below Hero */}
      <About />

      {/* 3. Luxury Featured Collection (Signature Extraits Showcase) */}
      <FeaturedCollection />

      {/* 4. Luxury Footer */}
      <Footer />
    </div>
  )
}

