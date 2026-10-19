import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { CartProvider } from './context/CartContext'
import CustomCursor from './components/common/CustomCursor/CustomCursor'
import Header from './components/layout/Header/Header'
import Home from './pages/Home/Home'
import Collection from './pages/Collection/Collection'
import Men from './pages/Men/Men'
import Women from './pages/Women/Women'
import AboutPage from './pages/About/AboutPage'
import Search from './pages/Search/Search'
import Account from './pages/Account/Account'
import Cart from './pages/Cart/Cart'
import {
  CartDrawer,
  QuickViewModal,
  CheckoutModal,
  ContactModal,
  InfoModal
} from './components/modals'
import LuxuryToast from './components/common/Toast/LuxuryToast'
import './App.css'

export default function App() {
  // Initialize smooth scrolling with Lenis + GSAP ScrollTrigger
  useSmoothScroll()

  const location = useLocation()

  // Scroll to top and refresh ScrollTrigger on route change
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 60)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <CartProvider>
      <div className="santuara-app">
        {/* Luxury Custom Cursor (Gold dot + lagging outer ring) */}
        <CustomCursor />

        {/* Shared Luxury Header Navigation across all pages */}
        <Header />

        {/* Main Content with subtle client-side page transition */}
        <main className="santuara-main">
          <div key={location.pathname} className="santuara-page-wrapper">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </main>

        {/* ================= GLOBAL ATELIER DRAWERS & MODALS ================= */}
        <CartDrawer />
        <QuickViewModal />
        <CheckoutModal />
        <ContactModal />
        <InfoModal />
        <LuxuryToast />
      </div>
    </CartProvider>
  )
}
