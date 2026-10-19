import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  User,
  ShoppingBag,
  X,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import './Navbar.css'

// Navigation links requested by the user
const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'collection', label: 'Collection', href: '#collection' },
  { id: 'men', label: 'Men', href: '#men' },
  { id: 'women', label: 'Women', href: '#women' },
  { id: 'bestsellers', label: 'Best Sellers', href: '#bestsellers' },
  { id: 'about', label: 'About', href: '#about' },
]

// Luxury Perfume Brand Emblem SVG
function BrandLogo() {
  return (
    <svg
      className="sentuara-logo-emblem"
      width="34"
      height="34"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sentuaraGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8E8C2" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#96742B" />
        </linearGradient>
      </defs>
      {/* Outer faceted flacon geometry */}
      <polygon
        points="24,3 39,9 45,24 39,39 24,45 9,39 3,24 9,9"
        stroke="url(#sentuaraGoldGrad)"
        strokeWidth="1.2"
        fill="rgba(212, 175, 55, 0.05)"
      />
      {/* Inner fine diamond facets */}
      <polygon
        points="24,8 36,24 24,40 12,24"
        stroke="url(#sentuaraGoldGrad)"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        fill="none"
        opacity="0.6"
      />
      {/* Central Haute S Monogram */}
      <path
        d="M27.5 17.5C26.8 15.8 25.2 14.8 23.5 14.8C20.8 14.8 19.2 16.5 19.2 18.8C19.2 22.8 28.5 22 28.5 27.2C28.5 30.5 25.8 32.5 22.8 32.5C20 32.5 18.2 30.7 17.6 28.5"
        stroke="url(#sentuaraGoldGrad)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Pure gold jewels */}
      <circle cx="24" cy="11.5" r="1.2" fill="url(#sentuaraGoldGrad)" />
      <circle cx="24" cy="35.5" r="1.2" fill="url(#sentuaraGoldGrad)" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const searchInputRef = useRef(null)

  // Listen to window scroll to trigger transparent -> solid transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu or modals are active
  useEffect(() => {
    if (mobileMenuOpen || searchOpen || cartOpen || accountOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, searchOpen, cartOpen, accountOpen])

  // Focus search input when search overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [searchOpen])

  // Handle ESC key to close open panels
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setSearchOpen(false)
        setCartOpen(false)
        setAccountOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header
        className={`sentuara-header ${scrolled ? 'sentuara-header--scrolled' : 'sentuara-header--transparent'}`}
        role="banner"
      >
        <div className="sentuara-header__container">
          {/* ================= LEFT: BRAND LOGO & NAME ================= */}
          <a
            href="#home"
            className="sentuara-header__brand"
            onClick={() => setActiveLink('home')}
            aria-label="Sentuara Haute Parfumerie Home"
          >
            <div className="sentuara-header__logo-wrap">
              <BrandLogo />
            </div>
            <div className="sentuara-header__brand-text">
              <span className="sentuara-header__brand-name">SENTUARA</span>
              <span className="sentuara-header__brand-tag">HAUTE PARFUMERIE</span>
            </div>
          </a>

          {/* ================= CENTER: DESKTOP NAVIGATION ================= */}
          <nav
            className="sentuara-header__nav"
            role="navigation"
            aria-label="Main Navigation"
          >
            <ul className="sentuara-header__nav-list">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.id
                return (
                  <li key={link.id} className="sentuara-header__nav-item">
                    <a
                      href={link.href}
                      className={`sentuara-header__nav-link ${isActive ? 'sentuara-header__nav-link--active' : ''}`}
                      onClick={() => setActiveLink(link.id)}
                    >
                      <span className="sentuara-header__link-label">{link.label}</span>
                      <span className="sentuara-header__link-underline" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* ================= RIGHT: ACTIONS & MOBILE TOGGLE ================= */}
          <div className="sentuara-header__actions">
            {/* Search Icon */}
            <button
              className="sentuara-header__icon-btn"
              onClick={() => {
                setSearchOpen(true)
                setCartOpen(false)
                setAccountOpen(false)
              }}
              aria-label="Search Fragrances"
              title="Search"
            >
              <Search size={19} strokeWidth={1.5} />
              <span className="sentuara-header__icon-glow" />
            </button>

            {/* Account Icon (Desktop) */}
            <button
              className="sentuara-header__icon-btn sentuara-header__icon-btn--account"
              onClick={() => {
                setAccountOpen(!accountOpen)
                setCartOpen(false)
                setSearchOpen(false)
              }}
              aria-label="My Account"
              title="Account"
            >
              <User size={19} strokeWidth={1.5} />
              <span className="sentuara-header__icon-glow" />
            </button>

            {/* Shopping Bag Icon */}
            <button
              className="sentuara-header__icon-btn sentuara-header__icon-btn--cart"
              onClick={() => {
                setCartOpen(!cartOpen)
                setSearchOpen(false)
                setAccountOpen(false)
              }}
              aria-label={`Shopping bag containing ${cartCount} items`}
              title="Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <span className="sentuara-header__cart-badge" aria-label={`${cartCount} items`}>
                {cartCount}
              </span>
              <span className="sentuara-header__icon-glow" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`sentuara-header__burger ${mobileMenuOpen ? 'sentuara-header__burger--active' : ''}`}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                setSearchOpen(false)
                setCartOpen(false)
                setAccountOpen(false)
              }}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sentuara-header__burger-line sentuara-header__burger-line--top" />
              <span className="sentuara-header__burger-line sentuara-header__burger-line--mid" />
              <span className="sentuara-header__burger-line sentuara-header__burger-line--bot" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULL-SCREEN LUXURY MOBILE MENU ================= */}
      <div
        className={`sentuara-mobile-menu ${mobileMenuOpen ? 'sentuara-mobile-menu--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="sentuara-mobile-menu__backdrop" onClick={() => setMobileMenuOpen(false)} />

        <div className="sentuara-mobile-menu__inner">
          {/* Top Bar inside Mobile Drawer */}
          <div className="sentuara-mobile-menu__header">
            <div className="sentuara-mobile-menu__brand">
              <BrandLogo />
              <span className="sentuara-mobile-menu__brand-title">SENTUARA</span>
            </div>
            <button
              className="sentuara-mobile-menu__close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="sentuara-mobile-menu__divider" />

          {/* Navigation Items with Editorial Numbering */}
          <nav className="sentuara-mobile-menu__nav" role="navigation">
            <ul className="sentuara-mobile-menu__list">
              {NAV_LINKS.map((link, idx) => {
                const num = `0${idx + 1}`
                const isActive = activeLink === link.id
                return (
                  <li
                    key={link.id}
                    className="sentuara-mobile-menu__item"
                    style={{ '--item-index': idx }}
                  >
                    <a
                      href={link.href}
                      className={`sentuara-mobile-menu__link ${isActive ? 'sentuara-mobile-menu__link--active' : ''}`}
                      onClick={() => {
                        setActiveLink(link.id)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <span className="sentuara-mobile-menu__item-num">{num}</span>
                      <span className="sentuara-mobile-menu__item-text">{link.label}</span>
                      <ChevronRight size={18} className="sentuara-mobile-menu__item-arrow" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="sentuara-mobile-menu__divider" />

          {/* Mobile Bottom Utilities: Account, Search shortcut & Concierge */}
          <div className="sentuara-mobile-menu__footer">
            <button
              className="sentuara-mobile-menu__account-btn"
              onClick={() => {
                setMobileMenuOpen(false)
                setAccountOpen(true)
              }}
            >
              <User size={16} className="text-gold" />
              <span>Privé Client Account</span>
            </button>

            <div className="sentuara-mobile-menu__meta">
              <span className="sentuara-mobile-menu__tag">PARIS &bull; GRASSE &bull; MILANO</span>
              <p className="sentuara-mobile-menu__sub">Artisanal Haute Parfumerie</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE SEARCH OVERLAY ================= */}
      <div
        className={`sentuara-search-modal ${searchOpen ? 'sentuara-search-modal--open' : ''}`}
        aria-hidden={!searchOpen}
      >
        <div className="sentuara-search-modal__backdrop" onClick={() => setSearchOpen(false)} />
        <div className="sentuara-search-modal__box">
          <div className="sentuara-search-modal__header">
            <span className="text-overline">EXPLORE THE MAISON</span>
            <button
              className="sentuara-search-modal__close"
              onClick={() => setSearchOpen(false)}
              aria-label="Close Search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="sentuara-search-modal__input-wrap">
            <Search size={22} className="sentuara-search-modal__icon text-gold" strokeWidth={1.5} />
            <input
              ref={searchInputRef}
              type="text"
              className="sentuara-search-modal__input"
              placeholder="Search by fragrance, note (Oud, Santal, Amber) or collection..."
            />
          </div>

          <div className="sentuara-search-modal__suggestions">
            <span className="sentuara-search-modal__suggestions-label">Curated Essences:</span>
            <div className="sentuara-search-modal__tags">
              {['Extrait de Parfum', 'Oud Impérial', 'Rose Damascena', 'Santal Sauvage', 'Ambre Doré'].map((tag) => (
                <button
                  key={tag}
                  className="sentuara-search-modal__tag"
                  onClick={() => setSearchOpen(false)}
                >
                  <Sparkles size={11} className="text-gold" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE MINI-BAG DRAWER ================= */}
      <div
        className={`sentuara-cart-drawer ${cartOpen ? 'sentuara-cart-drawer--open' : ''}`}
        aria-hidden={!cartOpen}
      >
        <div className="sentuara-cart-drawer__backdrop" onClick={() => setCartOpen(false)} />
        <div className="sentuara-cart-drawer__panel">
          <div className="sentuara-cart-drawer__header">
            <div className="sentuara-cart-drawer__title-wrap">
              <ShoppingBag size={18} className="text-gold" />
              <h3 className="sentuara-cart-drawer__title">SHOPPING BAG</h3>
            </div>
            <button
              className="sentuara-cart-drawer__close"
              onClick={() => setCartOpen(false)}
              aria-label="Close Bag"
            >
              <X size={20} />
            </button>
          </div>

          <div className="sentuara-cart-drawer__body">
            <div className="sentuara-cart-drawer__empty">
              <div className="sentuara-cart-drawer__empty-icon">
                <BrandLogo />
              </div>
              <p className="sentuara-cart-drawer__empty-text font-editorial-italic">
                "Your sanctuary bag is currently empty."
              </p>
              <span className="sentuara-cart-drawer__empty-sub">
                Explore our signature Extraits de Parfum and discovery sets.
              </span>
              <button
                className="sentuara-cart-drawer__explore-btn"
                onClick={() => setCartOpen(false)}
              >
                <span>Discover Creations</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE ACCOUNT MODAL ================= */}
      <div
        className={`sentuara-account-modal ${accountOpen ? 'sentuara-account-modal--open' : ''}`}
        aria-hidden={!accountOpen}
      >
        <div className="sentuara-account-modal__backdrop" onClick={() => setAccountOpen(false)} />
        <div className="sentuara-account-modal__box">
          <div className="sentuara-account-modal__header">
            <div className="sentuara-account-modal__seal">
              <BrandLogo />
            </div>
            <button
              className="sentuara-account-modal__close"
              onClick={() => setAccountOpen(false)}
              aria-label="Close account dialog"
            >
              <X size={18} />
            </button>
          </div>

          <h3 className="sentuara-account-modal__title">MAISON PRIVÉ</h3>
          <p className="sentuara-account-modal__subtitle font-editorial-italic">
            Access your private olfactory profile and bespoke reservations.
          </p>

          <form className="sentuara-account-modal__form" onSubmit={(e) => e.preventDefault()}>
            <div className="sentuara-account-modal__field">
              <label className="sentuara-account-modal__label">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="name@domain.com"
                className="sentuara-account-modal__input"
              />
            </div>
            <button type="submit" className="sentuara-account-modal__btn">
              SIGN IN TO ATELIER
            </button>
          </form>

          <div className="sentuara-account-modal__perks">
            <span>&bull; Complimentary Olfactory Discovery</span>
            <span>&bull; Private Masterclass Invitations</span>
          </div>
        </div>
      </div>
    </>
  )
}
