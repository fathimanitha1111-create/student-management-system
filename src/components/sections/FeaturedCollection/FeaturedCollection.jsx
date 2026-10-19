import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Heart,
  Droplets,
  Layers,
  Filter
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERFUMES_DATA, CATALOG_FILTERS } from '../../../data/perfumesData'
import { useCart } from '../../../context/CartContext'
import './FeaturedCollection.css'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedCollection() {
  const { addToCart, openQuickView } = useCart()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState({
    'santuara-noir': '50ml',
    'santuara-rose-royale': '50ml',
    'santuara-ambre-jasmin': '50ml',
    'santuara-santal-sacre': '50ml',
    'cedre-obsidienne': '50ml',
    'jasmin-mystique': '50ml',
  })
  const [wishlist, setWishlist] = useState([])

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  // Filtered perfumes based on user prompt requirements:
  // - All Fragrances
  // - Eau de Parfum
  // - Bestsellers
  // - New Arrivals
  const filteredPerfumes = PERFUMES_DATA.filter((p) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'edp') return p.isEauDeParfum === true
    if (selectedCategory === 'bestseller') return p.isBestseller === true
    if (selectedCategory === 'new') return p.isNewArrival === true
    return true
  })

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Handle Size change
  const handleSizeChange = (id, size, e) => {
    e.stopPropagation()
    setSelectedSizes((prev) => ({
      ...prev,
      [id]: size,
    }))
  }

  // Add to Bag action
  const handleAdd = (perfume, e) => {
    e.stopPropagation()
    const size = selectedSizes[perfume.id] || '50ml'
    addToCart(perfume, size, 1)
  }

  // GSAP Scroll Animation
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header entry animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
          },
        }
      )

      // Cards staggered entry
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [selectedCategory])

  return (
    <section ref={sectionRef} className="featured-perfumes" id="featured-collection">
      {/* Ambient background glows */}
      <div className="featured-perfumes__glow featured-perfumes__glow--left" aria-hidden="true" />
      <div className="featured-perfumes__glow featured-perfumes__glow--right" aria-hidden="true" />

      <div className="featured-perfumes__container">
        {/* ================= SECTION HEADER ================= */}
        <header ref={headerRef} className="featured-perfumes__header">
          <div className="featured-perfumes__eyebrow-wrap">
            <span className="featured-perfumes__bullet" aria-hidden="true" />
            <span className="featured-perfumes__eyebrow">HAUTE PARFUMERIE CATALOG</span>
          </div>

          <h2 className="featured-perfumes__title">
            <span className="featured-perfumes__title-gold">SIGNATURE EXTRAITS</span>
            <span className="featured-perfumes__title-italic font-editorial-italic">
              Crafted for Presence
            </span>
          </h2>

          <p className="featured-perfumes__subtitle">
            Distilled in limited harvests in Grasse and matured in our darkened cellars.
            Every flacon is formulated to leave an unforgettable, room-commanding sillage.
          </p>

          <div className="featured-perfumes__divider" aria-hidden="true" />

          {/* Interactive Category Filter Pills (Exact requested filters) */}
          <nav className="featured-perfumes__filters" aria-label="Catalog filters">
            {CATALOG_FILTERS.map((cat) => {
              const count =
                cat.id === 'all'
                  ? PERFUMES_DATA.length
                  : cat.id === 'edp'
                  ? PERFUMES_DATA.filter((p) => p.isEauDeParfum).length
                  : cat.id === 'bestseller'
                  ? PERFUMES_DATA.filter((p) => p.isBestseller).length
                  : PERFUMES_DATA.filter((p) => p.isNewArrival).length

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`featured-perfumes__filter-btn ${
                    selectedCategory === cat.id ? 'featured-perfumes__filter-btn--active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="featured-perfumes__filter-count">({count})</span>
                </button>
              )
            })}
          </nav>
        </header>

        {/* ================= PRODUCT CARDS GRID ================= */}
        <div ref={gridRef} className="featured-perfumes__grid">
          {filteredPerfumes.map((perfume) => {
            const currentSize = selectedSizes[perfume.id] || '50ml'
            const currentPrice =
              currentSize === '100ml' && perfume.price100ml
                ? perfume.price100ml
                : perfume.price
            const isWishlisted = wishlist.includes(perfume.id)

            return (
              <article
                key={perfume.id}
                className="featured-card"
                style={{ '--accent-color': perfume.accentColor }}
                onClick={() => openQuickView(perfume)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${perfume.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openQuickView(perfume)
                }}
              >
                {/* Floating Badges */}
                <div className="featured-card__badges">
                  <span className="featured-card__tag">{perfume.tag}</span>
                  <button
                    type="button"
                    className={`featured-card__wishlist-btn ${
                      isWishlisted ? 'featured-card__wishlist-btn--active' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(perfume.id)
                    }}
                    aria-label={`Save ${perfume.name} to wishlist`}
                  >
                    <Heart
                      size={15}
                      fill={isWishlisted ? '#D4AF37' : 'none'}
                      stroke={isWishlisted ? '#D4AF37' : 'currentColor'}
                    />
                  </button>
                </div>

                {/* Bottle Visual & Clickable Quick View Overlay */}
                <div className="featured-card__media">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="featured-card__image"
                    loading="lazy"
                  />
                  <div className="featured-card__media-overlay">
                    <button
                      type="button"
                      className="featured-card__quick-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        openQuickView(perfume)
                      }}
                    >
                      <Eye size={14} />
                      <span>QUICK VIEW &bull; NOTES</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="featured-card__body">
                  <div className="featured-card__meta">
                    <span className="featured-card__concentration">
                      {perfume.concentration}
                    </span>
                    <div className="featured-card__rating">
                      <Star size={12} fill="#D4AF37" stroke="#D4AF37" />
                      <span>{perfume.rating}</span>
                      <span className="featured-card__reviews">({perfume.reviews})</span>
                    </div>
                  </div>

                  <h3 className="featured-card__name">{perfume.name}</h3>
                  <div className="featured-card__type">{perfume.type}</div>

                  <p className="featured-card__notes-summary">
                    <Droplets size={12} className="featured-card__notes-icon" />
                    <span>{perfume.notesSummary}</span>
                  </p>

                  {/* Size Selector Switch */}
                  <div
                    className="featured-card__size-selector"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="featured-card__size-label">SIZE:</span>
                    <div className="featured-card__size-pills">
                      <button
                        type="button"
                        className={`featured-card__size-pill ${
                          currentSize === '50ml' ? 'featured-card__size-pill--active' : ''
                        }`}
                        onClick={(e) => handleSizeChange(perfume.id, '50ml', e)}
                      >
                        50 ML
                      </button>
                      <button
                        type="button"
                        className={`featured-card__size-pill ${
                          currentSize === '100ml' ? 'featured-card__size-pill--active' : ''
                        }`}
                        onClick={(e) => handleSizeChange(perfume.id, '100ml', e)}
                      >
                        100 ML
                      </button>
                    </div>
                  </div>

                  {/* Price & Add to Bag Row */}
                  <div className="featured-card__footer">
                    <div className="featured-card__price-box">
                      <span className="featured-card__amount">{currentPrice}</span>
                      <span className="featured-card__tax">USD / INCL. VAT</span>
                    </div>

                    <div className="featured-card__actions">
                      <button
                        type="button"
                        className="featured-card__bag-btn"
                        onClick={(e) => handleAdd(perfume, e)}
                        title={`Add ${perfume.name} to shopping bag`}
                      >
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ================= SECTION BOTTOM CTA ================= */}
        <div className="featured-perfumes__bottom-cta">
          <div className="featured-perfumes__bottom-card">
            <div className="featured-perfumes__bottom-text">
              <span className="featured-perfumes__bottom-eyebrow">
                <Sparkles size={14} className="featured-perfumes__bottom-sparkle" />
                BESPOKE DISCOVERY COFFRET
              </span>
              <h4 className="featured-perfumes__bottom-title">
                Uncertain which presence defines you?
              </h4>
              <p className="featured-perfumes__bottom-desc">
                Receive miniature extrait samples of our creations, accompanied by a
                voucher redeemable towards your full-sized flacon.
              </p>
            </div>
            <Link to="/collection" className="featured-perfumes__bottom-btn">
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
