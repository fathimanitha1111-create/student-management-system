import React, { useState } from 'react'
import {
  X,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  ShoppingBag
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './CheckoutModal.css'

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cartItems, subtotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@maison.com',
    address: '14 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    country: 'France',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!isCheckoutOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompleteOrder = (e) => {
    e.preventDefault()
    const generatedId = `SNT-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setIsSubmitted(true)
    clearCart()
  }

  const handleFinish = () => {
    setIsSubmitted(false)
    closeCheckout()
  }

  return (
    <div
      className="santuara-modal-backdrop"
      onClick={closeCheckout}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="santuara-checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="santuara-checkout-modal__close"
          onClick={closeCheckout}
          aria-label="Close Checkout"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div className="santuara-checkout-modal__grid">
            {/* Left: Atelier Form */}
            <div className="santuara-checkout-modal__form-side">
              <div className="santuara-checkout-modal__header">
                <span className="santuara-checkout-modal__eyebrow">
                  <Lock size={12} className="text-gold" />
                  MAISON PRIVÉ CHECKOUT
                </span>
                <h2 id="checkout-modal-title" className="santuara-checkout-modal__title">
                  RESERVE YOUR FLACONS
                </h2>
              </div>

              {/* Demo Notice Alert */}
              <div className="santuara-checkout-demo-alert">
                <Sparkles size={14} className="text-gold" />
                <div>
                  <strong>DEMONSTRATION CHECKOUT:</strong> This is a simulation flow. No real payment or credit card charge will occur.
                </div>
              </div>

              <form onSubmit={handleCompleteOrder} className="santuara-checkout-form">
                <div className="santuara-checkout-form__group">
                  <label className="santuara-checkout-form__label">FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="santuara-checkout-form__input"
                  />
                </div>

                <div className="santuara-checkout-form__group">
                  <label className="santuara-checkout-form__label">CONCIERGE EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="santuara-checkout-form__input"
                  />
                </div>

                <div className="santuara-checkout-form__group">
                  <label className="santuara-checkout-form__label">DELIVERY DESTINATION</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="santuara-checkout-form__input"
                  />
                </div>

                <div className="santuara-checkout-form__row">
                  <div className="santuara-checkout-form__group">
                    <label className="santuara-checkout-form__label">CITY</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="santuara-checkout-form__input"
                    />
                  </div>
                  <div className="santuara-checkout-form__group">
                    <label className="santuara-checkout-form__label">COUNTRY</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="santuara-checkout-form__input"
                    />
                  </div>
                </div>

                <button type="submit" className="santuara-checkout-submit-btn">
                  <span>PLACE DEMO RESERVATION (${subtotal} USD)</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="santuara-checkout-modal__summary-side">
              <h3 className="santuara-checkout-summary__title">ATELIER SUMMARY</h3>

              <div className="santuara-checkout-summary__items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="santuara-checkout-summary__item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="santuara-checkout-summary__thumb"
                    />
                    <div className="santuara-checkout-summary__info">
                      <span className="santuara-checkout-summary__name">{item.name}</span>
                      <span className="santuara-checkout-summary__meta">
                        {item.size} • Qty {item.quantity}
                      </span>
                    </div>
                    <span className="santuara-checkout-summary__price">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="santuara-checkout-totals">
                <div className="santuara-checkout-totals__row">
                  <span>Creation Subtotal</span>
                  <span>${subtotal} USD</span>
                </div>
                <div className="santuara-checkout-totals__row">
                  <span>Maison Express Courier</span>
                  <span className="text-gold">COMPLIMENTARY</span>
                </div>
                <div className="santuara-checkout-totals__row">
                  <span>Signature Obsidian Flacon Coffret</span>
                  <span className="text-gold">INCLUDED</span>
                </div>
                <div className="santuara-checkout-totals__divider" />
                <div className="santuara-checkout-totals__total-row">
                  <span>TOTAL DUE</span>
                  <span className="santuara-checkout-totals__total-val">${subtotal} USD</span>
                </div>
              </div>

              <div className="santuara-checkout-guarantee">
                <ShieldCheck size={16} className="text-gold" />
                <p>
                  Every flacon is individually verified, catalogued, and hand-sealed in our French workshop prior to dispatch.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="santuara-checkout-confirmed">
            <div className="santuara-checkout-confirmed__icon">
              <CheckCircle2 size={48} className="text-gold" />
            </div>
            <span className="santuara-checkout-confirmed__eyebrow">
              DEMONSTRATION ORDER CONFIRMED
            </span>
            <h2 className="santuara-checkout-confirmed__title">
              MERCI, {formData.name.toUpperCase()}
            </h2>
            <div className="santuara-checkout-confirmed__code-box">
              <span className="santuara-checkout-confirmed__code-label">RESERVATION ARCHIVE</span>
              <span className="santuara-checkout-confirmed__code">{orderId}</span>
            </div>
            <p className="santuara-checkout-confirmed__desc font-editorial-italic">
              "Your demonstration order has been recorded into the Santuara Atelier registry. In a production environment, this would initiate dispatch from Grasse to {formData.city}, {formData.country}."
            </p>
            <div className="santuara-checkout-confirmed__details">
              <Package size={16} className="text-gold" />
              <span>Includes Certificate of Hand-Blown Glass Authenticity</span>
            </div>
            <button
              type="button"
              className="santuara-checkout-confirmed__btn"
              onClick={handleFinish}
            >
              <span>CONTINUE EXPLORING SANTUARA</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
