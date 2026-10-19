import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Eye, Star, Droplets } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

const MEN_PRODUCTS = [
  {
    id: 'santuara-noir',
    name: 'SANTUARA NOIR',
    type: 'Woody · Amber',
    category: 'EXTRAIT DE PARFUM POUR HOMME',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Smoked Birch, Basalt Slate, Rare Oud & Raw Amber',
    notesSummary: 'Smoked Cedarwood, Basalt Rock, Black Pepper, Oud',
    price: 120,
    price100ml: 185,
    rating: 4.9,
    reviews: 148,
    image: '/images/santuara_men.jpg',
    story: 'An enigmatic nocturnal signature forged from smoldering volcanic stone, sacred woods, and golden amber.',
    olfactoryPyramid: {
      top: 'Smoked Birch, Bergamot, Pink Peppercorn',
      heart: 'Basalt Rock, Black Pepper, Haitian Vetiver',
      base: 'Aged Cambodian Oud, Raw Amber, Cedarwood',
    },
  },
  {
    id: 'cedre-obsidienne',
    name: 'CÈDRE OBSIDIENNE',
    type: 'Woody · Leather',
    category: 'EXTRAIT DE PARFUM',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Atlas Cedar, Crushed Black Pepper, Leather Resin',
    notesSummary: 'Atlas Cedar, Crushed Black Pepper, Leather Resin',
    price: 130,
    price100ml: 190,
    rating: 4.85,
    reviews: 82,
    image: '/images/santuara_men.jpg',
    story: 'A chiseled monolith of dark cedarwood steeped in raw leather and volcanic ash.',
    olfactoryPyramid: {
      top: 'Crushed Black Pepper, Juniper Berry, Pine Resin',
      heart: 'Atlas Cedar, Smoky Birch Tar, Nutmeg',
      base: 'Leather Resin, Dark Labdanum, Patchouli',
    },
  },
  {
    id: 'vetiver-noir',
    name: 'VÉTIVER IMPÉRIAL',
    type: 'Smoky · Vetiver',
    category: 'EXTRAIT DE PARFUM',
    concentration: 'EXTRAIT DE PARFUM',
    notes: 'Smoky Haitian Vetiver, Bergamot, Tonka Bean',
    notesSummary: 'Smoky Haitian Vetiver, Bergamot, Tonka Bean',
    price: 135,
    price100ml: 195,
    rating: 4.9,
    reviews: 64,
    image: '/images/santuara_about_bottle.jpg',
    story: 'Earthy Haitian vetiver roots washed in crisp citrus and roasted tonka bean.',
    olfactoryPyramid: {
      top: 'Calabrian Bergamot, Pink Grapefruit',
      heart: 'Haitian Vetiver, Nutmeg, Clary Sage',
      base: 'Tonka Bean, Atlas Cedar, Ambergris',
    },
  },
]

export default function Men() {
  const { addToCart, openQuickView } = useCart()

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">POUR HOMME</span>
          </div>
          <h1 className="santuara-page__title">SANTUARA MEN</h1>
          <p className="santuara-page__subtitle">
            Commanding presence, crafted with rare woods, smoked amber and dark volcanic resins.
          </p>
          <div className="santuara-page__divider" />
        </header>

        {/* Product Grid */}
        <div className="santuara-product-grid">
          {MEN_PRODUCTS.map((item) => (
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
