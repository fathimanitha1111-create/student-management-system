import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Eye, Star, Droplets } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

const WOMEN_PRODUCTS = [
  {
    id: 'santuara-rose-royale',
    name: 'SANTUARA ROSE ROYALE',
    type: 'Floral · Ambrée',
    category: 'EXTRAIT DE PARFUM POUR FEMME',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Damask Rose Petals, Radiant Amber & Velvet Cashmere',
    notesSummary: 'Damask Rose Petals, Sunlit Amber, Cashmere Musk',
    price: 135,
    price100ml: 195,
    rating: 5.0,
    reviews: 192,
    image: '/images/santuara_women.jpg',
    story: 'Hand-harvested May roses suspended in warm, liquid amber. A modern romantic hymn.',
    olfactoryPyramid: {
      top: 'Morning Dew Rose, Mandarin, Lychee',
      heart: 'Centifolia Rose Petals, Grasse Jasmin, Violet Leaf',
      base: 'Sunlit Amber, Cashmere Musk, Vanilla Fluff',
    },
  },
  {
    id: 'jasmin-mystique',
    name: 'JASMIN MYSTIQUE',
    type: 'Floral · Solar',
    category: 'EXTRAIT DE PARFUM',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Night-blooming Jasmine, Bergamot Zest & Golden Honey',
    notesSummary: 'Night-blooming Jasmine, Bergamot Zest & Golden Honey',
    price: 125,
    price100ml: 180,
    rating: 4.9,
    reviews: 76,
    image: '/images/santuara_women.jpg',
    story: 'Night-blooming jasmine blossoms drenched in summer rain and wild mountain honey.',
    olfactoryPyramid: {
      top: 'Italian Bergamot Zest, White Peach',
      heart: 'Night-blooming Jasmine, Orange Blossom, Solar Accords',
      base: 'Golden Honey, White Cashmere Musk, Sandalwood',
    },
  },
  {
    id: 'fleur-dor',
    name: 'FLEUR D’OR',
    type: 'Solar · Floral',
    category: 'EXTRAIT DE PARFUM',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Solar Orange Blossom, White Iris & Warm Ambergris',
    notesSummary: 'Solar Orange Blossom, White Iris & Warm Ambergris',
    price: 140,
    price100ml: 205,
    rating: 4.88,
    reviews: 58,
    image: '/images/santuara_about_bottle.jpg',
    story: 'Sun-drenched Mediterranean citrus orchards enfolded with buttery French iris and amber.',
    olfactoryPyramid: {
      top: 'Bitter Orange, Neroli Petitgrain',
      heart: 'Grasse Orange Blossom, Florentine Iris',
      base: 'Ambergris, Bourbon Vanilla, Benzoin',
    },
  },
]

export default function Women() {
  const { addToCart, openQuickView } = useCart()

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">POUR FEMME</span>
          </div>
          <h1 className="santuara-page__title">SANTUARA WOMEN</h1>
          <p className="santuara-page__subtitle">
            An ethereal aura of Grasse florals, velvety damask rose and warm radiant amber.
          </p>
          <div className="santuara-page__divider" />
        </header>

        {/* Product Grid */}
        <div className="santuara-product-grid">
          {WOMEN_PRODUCTS.map((item) => (
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
                <span className="santuara-product-card__concentration">{item.category}</span>
                <div className="santuara-product-card__rating">
                  <Star size={11} fill="#D4AF37" stroke="#D4AF37" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <h2 className="santuara-product-card__title">{item.name}</h2>
              <div className="santuara-product-card__type font-editorial-italic">{item.type}</div>

              <p className="santuara-product-card__notes">
                <Droplets size={12} className="text-gold" style={{ display: 'inline', marginRight: 4 }} />
                {item.notes}
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
