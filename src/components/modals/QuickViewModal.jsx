import React, { useState } from 'react'
import {
  X,
  Star,
  ShoppingBag,
  Layers,
  Plus,
  Minus,
  Check,
  Sparkles,
  Droplets
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './QuickViewModal.css'

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('50ml')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!quickViewProduct) return null

  const unitPrice =
    selectedSize === '100ml' && quickViewProduct.price100ml
      ? quickViewProduct.price100ml
      : quickViewProduct.price

  const totalPrice = unitPrice * quantity

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      closeQuickView()
    }, 700)
  }

  return (
    <div
      className="santuara-modal-backdrop"
      onClick={closeQuickView}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="santuara-qv-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="santuara-qv-modal__close"
          onClick={closeQuickView}
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        <div className="santuara-qv-modal__layout">
          {/* Left Media */}
          <div className="santuara-qv-modal__media">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="santuara-qv-modal__img"
            />
            <div className="santuara-qv-modal__badge">
              <Sparkles size={11} className="text-gold" />
              <span>{quickViewProduct.concentration}</span>
            </div>
          </div>

          {/* Right Details */}
          <div className="santuara-qv-modal__content">
            <div className="santuara-qv-modal__top-meta">
              <span className="santuara-qv-modal__type">{quickViewProduct.type}</span>
              <div className="santuara-qv-modal__rating">
                <Star size={13} fill="#D4AF37" stroke="#D4AF37" />
                <span>{quickViewProduct.rating || 4.9}</span>
                <span className="santuara-qv-modal__reviews">
                  ({quickViewProduct.reviews || 120} reviews)
                </span>
              </div>
            </div>

            <h2 id="quick-view-title" className="santuara-qv-modal__title">
              {quickViewProduct.name}
            </h2>

            <p className="santuara-qv-modal__story font-editorial-italic">
              "{quickViewProduct.story || quickViewProduct.description}"
            </p>

            {/* Olfactory Pyramid Breakdown */}
            {quickViewProduct.olfactoryPyramid && (
              <div className="santuara-qv-pyramid">
                <div className="santuara-qv-pyramid__title">
                  <Layers size={13} className="text-gold" />
                  <span>OLFACTORY ARCHITECTURE</span>
                </div>

                <div className="santuara-qv-pyramid__row">
                  <span className="santuara-qv-pyramid__label">TOP</span>
                  <span className="santuara-qv-pyramid__notes font-editorial">
                    {quickViewProduct.olfactoryPyramid.top}
                  </span>
                </div>

                <div className="santuara-qv-pyramid__row">
                  <span className="santuara-qv-pyramid__label">HEART</span>
                  <span className="santuara-qv-pyramid__notes font-editorial">
                    {quickViewProduct.olfactoryPyramid.heart}
                  </span>
                </div>

                <div className="santuara-qv-pyramid__row">
                  <span className="santuara-qv-pyramid__label">BASE</span>
                  <span className="santuara-qv-pyramid__notes font-editorial">
                    {quickViewProduct.olfactoryPyramid.base}
                  </span>
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="santuara-qv-options">
              <div className="santuara-qv-option-group">
                <label className="santuara-qv-option-label">FLACON VOLUME</label>
                <div className="santuara-qv-size-pills">
                  <button
                    type="button"
                    className={`santuara-qv-size-pill ${selectedSize === '50ml' ? 'santuara-qv-size-pill--active' : ''}`}
                    onClick={() => setSelectedSize('50ml')}
                  >
                    50 ML / 1.7 FL. OZ.
                  </button>
                  <button
                    type="button"
                    className={`santuara-qv-size-pill ${selectedSize === '100ml' ? 'santuara-qv-size-pill--active' : ''}`}
                    onClick={() => setSelectedSize('100ml')}
                  >
                    100 ML / 3.4 FL. OZ.
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="santuara-qv-option-group">
                <label className="santuara-qv-option-label">QUANTITY</label>
                <div className="santuara-qv-qty-box">
                  <button
                    type="button"
                    className="santuara-qv-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="santuara-qv-qty-val">{quantity}</span>
                  <button
                    type="button"
                    className="santuara-qv-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="santuara-qv-modal__footer">
              <div className="santuara-qv-modal__price-wrap">
                <span className="santuara-qv-modal__total-label">TOTAL VALUE</span>
                <span className="santuara-qv-modal__price">${totalPrice} USD</span>
              </div>

              <button
                type="button"
                className={`santuara-qv-modal__add-btn ${added ? 'santuara-qv-modal__add-btn--success' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
