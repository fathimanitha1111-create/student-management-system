import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search as SearchIcon,
  Sparkles,
  ShoppingBag,
  Eye,
  Star,
  Droplets,
  ArrowRight
} from 'lucide-react'
import { PERFUMES_DATA } from '../../data/perfumesData'
import { useCart } from '../../context/CartContext'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

const POPULAR_QUERIES = ['Amber', 'Oud Noir', 'Grasse Rose', 'Smoked Woods', 'Jasmine', 'Santal']

export default function Search() {
  const { addToCart, openQuickView } = useCart()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = PERFUMES_DATA.filter((item) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(term) ||
      item.notesSummary.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    )
  })

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">DISCOVERY ATELIER</span>
          </div>
          <h1 className="santuara-page__title">SEARCH SANTUARA</h1>
          <p className="santuara-page__subtitle">
            Explore our archive by olfactory families, rare botanicals, and bespoke accords.
          </p>
          <div className="santuara-page__divider" />
        </header>

        {/* Luxury Search Input */}
        <div className="santuara-search-box">
          <div className="santuara-search-input-wrap">
            <SearchIcon size={20} color="var(--gold-primary)" strokeWidth={1.5} />
            <input
              type="text"
              className="santuara-search-input"
              placeholder="Search fragrances, notes (e.g. Amber, Rose, Sandalwood)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                }}
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="santuara-search-tags">
            <span className="santuara-search-tag-label">SUGGESTIONS:</span>
            {POPULAR_QUERIES.map((tag) => (
              <button
                key={tag}
                type="button"
                className="santuara-search-tag"
                onClick={() => setSearchTerm(tag)}
              >
                <Sparkles size={11} style={{ display: 'inline', marginRight: 4, color: 'var(--gold-primary)' }} />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="santuara-product-grid">
          {filteredItems.map((item) => (
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

              <div className="santuara-product-card__header-row">
                <span className="santuara-product-card__concentration">{item.concentration}</span>
                <div className="santuara-product-card__rating">
                  <Star size={11} fill="#D4AF37" stroke="#D4AF37" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <h2 className="santuara-product-card__title">{item.name}</h2>
              <div className="santuara-product-card__type font-editorial-italic">{item.type}</div>

              <p className="santuara-product-card__notes">
                <Droplets size={12} className="text-gold" style={{ display: 'inline', marginRight: 4 }} />
                {item.notesSummary}
              </p>

              <div className="santuara-product-card__footer">
                <div className="santuara-product-card__price-wrap">
                  <span className="santuara-product-card__price">${item.price}</span>
                  <span className="santuara-product-card__vat">50 ML &bull; VAT INCL.</span>
                </div>
                <button
                  type="button"
                  className="santuara-product-card__add-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(item, '50ml', 1)
                  }}
                  title={`Add ${item.name} to bag`}
                >
                  <ShoppingBag size={14} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
