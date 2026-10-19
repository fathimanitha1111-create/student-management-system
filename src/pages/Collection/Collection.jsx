import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Droplets,
  Heart
} from 'lucide-react'
import { PERFUMES_DATA, CATALOG_FILTERS } from '../../data/perfumesData'
import { useCart } from '../../context/CartContext'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

export default function Collection() {
  const { addToCart, openQuickView } = useCart()

  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState({
    'santuara-noir': '50ml',
    'santuara-rose-royale': '50ml',
    'santuara-ambre-jasmin': '50ml',
    'santuara-santal-sacre': '50ml',
    'cedre-obsidienne': '50ml',
    'jasmin-mystique': '50ml',
  })
  const [wishlist, setWishlist] = useState([])

  const filteredItems = PERFUMES_DATA.filter((p) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'edp') return p.isEauDeParfum === true
    if (selectedFilter === 'bestseller') return p.isBestseller === true
    if (selectedFilter === 'new') return p.isNewArrival === true
    return true
  })

  const toggleWishlist = (id, e) => {
    e.stopPropagation()
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSizeChange = (id, size, e) => {
    e.stopPropagation()
    setSelectedSizes((prev) => ({ ...prev, [id]: size }))
  }

  const handleAdd = (item, e) => {
    e.stopPropagation()
    const size = selectedSizes[item.id] || '50ml'
    addToCart(item, size, 1)
  }

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">HAUTE PARFUMERIE CATALOG</span>
          </div>
          <h1 className="santuara-page__title">THE SANTUARA COLLECTION</h1>
          <p className="santuara-page__subtitle">
            Discover fragrances crafted to leave an unforgettable impression. Distilled in limited batches in Grasse.
          </p>
          <div className="santuara-page__divider" />

          {/* Catalog Filter Tabs */}
          <div className="santuara-catalog-filters" role="tablist" aria-label="Fragrance categories">
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
                  className={`santuara-catalog-filter-btn ${
                    selectedFilter === cat.id ? 'santuara-catalog-filter-btn--active' : ''
                  }`}
                  onClick={() => setSelectedFilter(cat.id)}
                  role="tab"
                  aria-selected={selectedFilter === cat.id}
                >
                  <span>{cat.label}</span>
                  <span className="santuara-catalog-filter-count">({count})</span>
                </button>
              )
            })}
          </div>
        </header>

        {/* Product Grid */}
        <div className="santuara-product-grid">
          {filteredItems.map((item) => {
            const currentSize = selectedSizes[item.id] || '50ml'
            const currentPrice =
              currentSize === '100ml' && item.price100ml ? item.price100ml : item.price
            const isWishlisted = wishlist.includes(item.id)

            return (
              <article
                key={item.id}
                className="santuara-product-card"
                onClick={() => openQuickView(item)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.name} details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openQuickView(item)
                }}
              >
                {/* Floating Wishlist & Badge */}
                <div className="santuara-product-card__badges">
                  <span className="santuara-product-card__tag">{item.tag || item.concentration}</span>
                  <button
                    type="button"
                    className={`santuara-product-card__wishlist-btn ${
                      isWishlisted ? 'santuara-product-card__wishlist-btn--active' : ''
                    }`}
                    onClick={(e) => toggleWishlist(item.id, e)}
                    aria-label={`Save ${item.name} to wishlist`}
                  >
                    <Heart
                      size={15}
                      fill={isWishlisted ? '#D4AF37' : 'none'}
                      stroke={isWishlisted ? '#D4AF37' : 'currentColor'}
                    />
                  </button>
                </div>

                <div className="santuara-product-card__img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="santuara-product-card__img"
                    loading="lazy"
                  />
                  <div className="santuara-product-card__hover-overlay">
                    <button
                      type="button"
                      className="santuara-product-card__quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        openQuickView(item)
                      }}
                    >
                      <Eye size={14} />
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                </div>

                <div className="santuara-product-card__content">
                  <div className="santuara-product-card__header-row">
                    <span className="santuara-product-card__concentration">{item.concentration}</span>
                    <div className="santuara-product-card__rating">
                      <Star size={11} fill="#D4AF37" stroke="#D4AF37" />
                      <span>{item.rating || 4.9}</span>
                    </div>
                  </div>

                  <h2 className="santuara-product-card__title">{item.name}</h2>
                  <div className="santuara-product-card__type font-editorial-italic">{item.type}</div>

                  <p className="santuara-product-card__notes">
                    <Droplets size={12} className="text-gold" style={{ display: 'inline', marginRight: 4 }} />
                    {item.notesSummary || item.notes}
                  </p>

                  {/* Size switch */}
                  <div
                    className="santuara-product-card__size-row"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="santuara-product-card__size-label">SIZE:</span>
                    <div className="santuara-product-card__size-btns">
                      <button
                        type="button"
                        className={`santuara-product-card__size-btn ${currentSize === '50ml' ? 'santuara-product-card__size-btn--active' : ''}`}
                        onClick={(e) => handleSizeChange(item.id, '50ml', e)}
                      >
                        50 ML
                      </button>
                      <button
                        type="button"
                        className={`santuara-product-card__size-btn ${currentSize === '100ml' ? 'santuara-product-card__size-btn--active' : ''}`}
                        onClick={(e) => handleSizeChange(item.id, '100ml', e)}
                      >
                        100 ML
                      </button>
                    </div>
                  </div>

                  <div className="santuara-product-card__footer">
                    <div className="santuara-product-card__price-wrap">
                      <span className="santuara-product-card__price">${currentPrice}</span>
                      <span className="santuara-product-card__vat">USD / VAT INCL.</span>
                    </div>

                    <div className="santuara-product-card__btn-group">
                      <button
                        type="button"
                        className="santuara-product-card__add-btn"
                        onClick={(e) => handleAdd(item, e)}
                        title={`Add ${item.name} to shopping bag`}
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
      </div>

      <Footer />
    </div>
  )
}
