import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  User,
  ShoppingBag,
  X,
  ChevronRight,
  ArrowRight,
  MessageSquareQuote
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import './Header.css'

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', path: '/' },
  { id: 'collection', label: 'SHOP', path: '/collection' },
  { id: 'men', label: 'MEN', path: '/men' },
  { id: 'women', label: 'WOMEN', path: '/women' },
  { id: 'about', label: 'OUR STORY', path: '/about' },
  { id: 'contact', label: 'CONTACT', path: '#contact' },
]

const MOBILE_ACTION_ITEMS = [
  { id: 'search', label: 'SEARCH', path: '/search', icon: Search },
  { id: 'account', label: 'ACCOUNT', path: '/account', icon: User },
  { id: 'cart', label: 'SHOPPING BAG', path: '/cart', icon: ShoppingBag },
  { id: 'contact', label: 'CONCIERGE', path: '#contact', icon: MessageSquareQuote },
]

/**
 * Minimal luxury flame/droplet symbol for Santuara
 */
function FlameDropSymbol() {
  return (
    <svg
      className="santuara-flame-symbol"
      width="20"
      height="25"
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF0D9" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#96742B" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5C12 2.5 5 12.8 5 18C5 22.4 8.1 26 12 26C15.9 26 19 22.4 19 18C19 12.8 12 2.5 12 2.5Z"
        stroke="url(#goldFlameGrad)"
        strokeWidth="1.2"
        fill="rgba(212, 175, 55, 0.06)"
      />
      <path
        d="M12 9C12 9 8.5 14.5 8.5 18C8.5 20.2 10.1 22 12 22C13.9 22 15.5 20.2 15.5 18C15.5 14.5 12 9 12 9Z"
        fill="url(#goldFlameGrad)"
        opacity="0.85"
      />
    </svg>
  )
}

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const { cartCount, openCartDrawer, openContact } = useCart()

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll listener for transparent -> solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // ESC key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Active status helper
  const isHomeActive = pathname === '/'
  const isCollectionActive = pathname.startsWith('/collection')
  const isMenActive = pathname.startsWith('/men')
  const isWomenActive = pathname.startsWith('/women')
  const isAboutActive = pathname.startsWith('/about')
  const isSearchActive = pathname.startsWith('/search')
  const isAccountActive = pathname.startsWith('/account')
  const isCartActive = pathname.startsWith('/cart')

  const getIsActive = (id) => {
    if (id === 'home') return isHomeActive
    if (id === 'collection') return isCollectionActive
    if (id === 'men') return isMenActive
    if (id === 'women') return isWomenActive
    if (id === 'about') return isAboutActive
    return false
  }

  // Smooth scroll and navigation dispatcher
  const handleNavClick = (e, item) => {
    if (item.id === 'home') {
      if (pathname === '/') {
        e.preventDefault()
        const heroEl = document.getElementById('home')
        if (heroEl) {
          if (window.__lenis) window.__lenis.scrollTo(heroEl, { duration: 1.2 })
          else heroEl.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    } else if (item.id === 'collection') {
      if (pathname === '/') {
        const catEl = document.getElementById('featured-collection')
        if (catEl) {
          e.preventDefault()
          if (window.__lenis) window.__lenis.scrollTo(catEl, { offset: -60, duration: 1.2 })
          else catEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (item.id === 'about') {
      if (pathname === '/') {
        const aboutEl = document.getElementById('about-section')
        if (aboutEl) {
          e.preventDefault()
          if (window.__lenis) window.__lenis.scrollTo(aboutEl, { offset: -60, duration: 1.2 })
          else aboutEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (item.id === 'contact') {
      e.preventDefault()
      openContact()
    }
  }

  // Scrolled state: always frosted on subpages, adaptive on home page
  const isHeaderScrolled = scrolled || pathname !== '/'

  return (
    <>
      <header
        className={`santuara-header ${isHeaderScrolled ? 'santuara-header--scrolled' : 'santuara-header--transparent'}`}
        role="banner"
      >
        <div className="santuara-header__inner">
          {/* ================= LEFT: SANTUARA LOGO ================= */}
          <Link
            to="/"
            className="santuara-header__brand"
            aria-label="Santuara Haute Parfumerie"
            onClick={(e) => handleNavClick(e, { id: 'home' })}
          >
            <FlameDropSymbol />
            <span className="santuara-header__wordmark">SANTUARA</span>
          </Link>

          {/* ================= CENTER: NAVIGATION ================= */}
          <nav
            className="santuara-header__nav"
            role="navigation"
            aria-label="Primary Navigation"
          >
            <ul className="santuara-header__nav-list">
              {NAV_ITEMS.map((item) => {
                const isActive = getIsActive(item.id)
                return (
                  <li key={item.id} className="santuara-header__nav-item">
                    <Link
                      to={item.path}
                      className={`santuara-header__nav-link ${isActive ? 'santuara-header__nav-link--active' : ''}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      <span className="santuara-header__nav-text">{item.label}</span>
                      <span className="santuara-header__nav-underline" aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ================= RIGHT: ACTION ICONS ================= */}
          <div className="santuara-header__actions">
            {/* Search */}
            <Link
              to="/search"
              className={`santuara-header__action-btn ${isSearchActive ? 'santuara-header__action-btn--active' : ''}`}
              aria-label="Search fragrances"
              title="Search"
            >
              <Search size={18} strokeWidth={1.5} />
              <span className="santuara-header__action-glow" />
            </Link>

            {/* Account / User */}
            <Link
              to="/account"
              className={`santuara-header__action-btn santuara-header__action-btn--account ${isAccountActive ? 'santuara-header__action-btn--active' : ''}`}
              aria-label="Account Login"
              title="Account"
            >
              <User size={18} strokeWidth={1.5} />
              <span className="santuara-header__action-glow" />
            </Link>

            {/* Shopping Bag Button (Opens Cart Drawer) */}
            <button
              type="button"
              className={`santuara-header__action-btn santuara-header__action-btn--bag ${isCartActive ? 'santuara-header__action-btn--active' : ''}`}
              onClick={openCartDrawer}
              aria-label={`Shopping bag with ${cartCount} items`}
              title="Open Shopping Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="santuara-header__cart-badge">{cartCount}</span>
              <span className="santuara-header__action-glow" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={`santuara-header__burger ${mobileMenuOpen ? 'santuara-header__burger--active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="santuara-header__burger-line" />
              <span className="santuara-header__burger-line" />
            </button>
          </div>
        </div>

        {/* Thin subtle gold bottom divider line */}
        <div className="santuara-header__bottom-line" />
      </header>

      {/* ================= FULL-SCREEN LUXURY MOBILE MENU ================= */}
      <div
        className={`santuara-mobile-drawer ${mobileMenuOpen ? 'santuara-mobile-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="santuara-mobile-drawer__backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="santuara-mobile-drawer__panel">
          <div className="santuara-mobile-drawer__top">
            <Link
              to="/"
              className="santuara-mobile-drawer__brand"
              onClick={(e) => {
                setMobileMenuOpen(false)
                handleNavClick(e, { id: 'home' })
              }}
            >
              <FlameDropSymbol />
              <span className="santuara-mobile-drawer__wordmark">SANTUARA</span>
            </Link>
            <button
              type="button"
              className="santuara-mobile-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="santuara-mobile-drawer__separator" />

          {/* Staggered Navigation Items: HOME, SHOP, MEN, WOMEN, OUR STORY, CONTACT */}
          <nav className="santuara-mobile-drawer__nav">
            <ul className="santuara-mobile-drawer__list">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = getIsActive(item.id)
                const num = `0${idx + 1}`
                return (
                  <li
                    key={item.id}
                    className="santuara-mobile-drawer__item"
                    style={{ '--item-idx': idx }}
                  >
                    <Link
                      to={item.path}
                      className={`santuara-mobile-drawer__link ${isActive ? 'santuara-mobile-drawer__link--active' : ''}`}
                      onClick={(e) => {
                        setMobileMenuOpen(false)
                        handleNavClick(e, item)
                      }}
                    >
                      <span className="santuara-mobile-drawer__num">{num}</span>
                      <span className="santuara-mobile-drawer__label">{item.label}</span>
                      <ChevronRight size={18} className="santuara-mobile-drawer__arrow" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="santuara-mobile-drawer__separator" />

          {/* Additional Actions: SEARCH, ACCOUNT, SHOPPING BAG, CONCIERGE */}
          <div className="santuara-mobile-drawer__actions-section">
            <span className="santuara-mobile-drawer__actions-title">EXPLORE &amp; SERVICES</span>
            <div className="santuara-mobile-drawer__actions-grid">
              {MOBILE_ACTION_ITEMS.map((act) => {
                const IconComponent = act.icon
                const isBag = act.id === 'cart'
                const isContact = act.id === 'contact'

                if (isBag) {
                  return (
                    <button
                      key={act.id}
                      type="button"
                      className="santuara-mobile-drawer__action-pill"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        openCartDrawer()
                      }}
                    >
                      <IconComponent size={16} className="text-gold" />
                      <span>SHOPPING BAG ({cartCount})</span>
                    </button>
                  )
                }

                if (isContact) {
                  return (
                    <button
                      key={act.id}
                      type="button"
                      className="santuara-mobile-drawer__action-pill"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        openContact()
                      }}
                    >
                      <IconComponent size={16} className="text-gold" />
                      <span>CONCIERGE</span>
                    </button>
                  )
                }

                const isActive = pathname.startsWith(act.path)
                return (
                  <Link
                    key={act.id}
                    to={act.path}
                    className={`santuara-mobile-drawer__action-pill ${isActive ? 'santuara-mobile-drawer__action-pill--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent size={16} className="text-gold" />
                    <span>{act.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="santuara-mobile-drawer__bottom">
            <p className="santuara-mobile-drawer__tagline font-editorial-italic">
              "More than a fragrance, it's a presence."
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
