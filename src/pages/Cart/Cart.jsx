import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

export default function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    openCheckout,
    clearCart
  } = useCart()

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">ATELIER SELECTIONS</span>
          </div>
          <h1 className="santuara-page__title">YOUR SHOPPING BAG</h1>
          <p className="santuara-page__subtitle">
            {cartItems.length > 0
              ? `You have reserved ${cartCount} flacon${cartCount > 1 ? 's' : ''} in your private atelier order.`
              : 'Your bag is waiting for something unforgettable.'}
          </p>
          <div className="santuara-page__divider" />
        </header>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="santuara-cart-empty-box">
            <div className="santuara-cart-icon-wrap">
              <ShoppingBag size={30} strokeWidth={1.4} />
            </div>

            <p className="santuara-cart-empty-text">
              "Your bag is waiting for something unforgettable."
            </p>

            <p className="santuara-cart-empty-sub">
              Each creation is distilled in limited batches. Explore our artisanal extraits and private flacons.
            </p>

            <Link to="/collection" className="santuara-btn-gold" style={{ maxWidth: 300 }}>
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={15} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="santuara-cart-view-grid">
            {/* Left: Cart Items List */}
            <div className="santuara-cart-items-col">
              <div className="santuara-cart-table-header">
                <span className="santuara-cart-col-head">CREATION</span>
                <span className="santuara-cart-col-head santuara-cart-col-head--qty">QUANTITY</span>
                <span className="santuara-cart-col-head santuara-cart-col-head--total">TOTAL</span>
              </div>

              <div className="santuara-cart-items-list">
                {cartItems.map((item) => {
                  const itemKey = `${item.id}-${item.size}`
                  const itemTotal = item.price * item.quantity

                  return (
                    <article key={itemKey} className="santuara-cart-row">
                      <div className="santuara-cart-row__img-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="santuara-cart-row__img"
                        />
                      </div>

                      <div className="santuara-cart-row__info">
                        <span className="santuara-cart-row__conc">{item.concentration}</span>
                        <h2 className="santuara-cart-row__name">{item.name}</h2>
                        <span className="santuara-cart-row__type font-editorial-italic">
                          {item.type}
                        </span>
                        <div className="santuara-cart-row__size-badge">
                          VOLUME: <strong>{item.size}</strong> &bull; ${item.price} USD / unit
                        </div>

                        {/* Mobile Qty & Remove Row */}
                        <div className="santuara-cart-row__mobile-actions">
                          <div className="santuara-cart-qty-ctrl">
                            <button
                              type="button"
                              className="santuara-cart-qty-btn"
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="santuara-cart-qty-num">{item.quantity}</span>
                            <button
                              type="button"
                              className="santuara-cart-qty-btn"
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="santuara-cart-row__remove-btn"
                            onClick={() => removeFromCart(item.id, item.size)}
                            aria-label={`Remove ${item.name} from bag`}
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Desktop Qty Control */}
                      <div className="santuara-cart-row__desktop-qty">
                        <div className="santuara-cart-qty-ctrl">
                          <button
                            type="button"
                            className="santuara-cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="santuara-cart-qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="santuara-cart-qty-btn"
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="santuara-cart-row__remove-desktop"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Desktop Total */}
                      <div className="santuara-cart-row__total-box">
                        <span className="santuara-cart-row__total-val">${itemTotal}</span>
                        <span className="santuara-cart-row__vat">USD / VAT INCL.</span>
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* Bottom Nav / Actions */}
              <div className="santuara-cart-actions-bar">
                <Link to="/collection" className="santuara-cart-back-btn">
                  <ArrowLeft size={14} />
                  <span>CONTINUE DISCOVERING</span>
                </Link>

                <button
                  type="button"
                  className="santuara-cart-clear-btn"
                  onClick={clearCart}
                >
                  <span>CLEAR BAG</span>
                </button>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <aside className="santuara-cart-summary-col">
              <div className="santuara-cart-summary-box">
                <h2 className="santuara-cart-summary__heading">ATELIER SUMMARY</h2>

                <div className="santuara-cart-summary__lines">
                  <div className="santuara-cart-summary__line">
                    <span>Creations ({cartCount})</span>
                    <span>${subtotal} USD</span>
                  </div>
                  <div className="santuara-cart-summary__line">
                    <span>Maison Express Courier</span>
                    <span className="text-gold">COMPLIMENTARY</span>
                  </div>
                  <div className="santuara-cart-summary__line">
                    <span>Signature Obsidian Box</span>
                    <span className="text-gold">INCLUDED</span>
                  </div>
                  <div className="santuara-cart-summary__line">
                    <span>3 Complimentary Samples</span>
                    <span className="text-gold">INCLUDED</span>
                  </div>
                </div>

                <div className="santuara-cart-summary__divider" />

                <div className="santuara-cart-summary__grand-total">
                  <span>TOTAL DUE</span>
                  <span className="santuara-cart-summary__price">${subtotal} USD</span>
                </div>

                <button
                  type="button"
                  className="santuara-cart-checkout-btn"
                  onClick={openCheckout}
                >
                  <span>PROCEED TO ATELIER CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>

                <div className="santuara-cart-perks">
                  <div className="santuara-cart-perk-item">
                    <Sparkles size={14} className="text-gold" />
                    <span>Sealed with Santuara hot wax emblem</span>
                  </div>
                  <div className="santuara-cart-perk-item">
                    <ShieldCheck size={14} className="text-gold" />
                    <span>Insured express delivery with live GPS courier tracking</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
