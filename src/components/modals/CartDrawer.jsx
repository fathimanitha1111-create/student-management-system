import React from 'react'
import { Link } from 'react-router-dom'
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cartItems,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    openCheckout,
  } = useCart()

  if (!isCartDrawerOpen) return null

  return (
    <div
      className="santuara-drawer-backdrop"
      onClick={closeCartDrawer}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
    >
      <div
        className="santuara-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <header className="santuara-drawer-header">
          <div className="santuara-drawer-header__title-wrap">
            <ShoppingBag size={18} className="text-gold" />
            <h2 className="santuara-drawer-header__title">YOUR SHOPPING BAG</h2>
            <span className="santuara-drawer-header__count">({cartCount})</span>
          </div>
          <button
            type="button"
            className="santuara-drawer-close-btn"
            onClick={closeCartDrawer}
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </header>

        {/* Complimentary Courier Banner */}
        <div className="santuara-drawer-perk">
          <Sparkles size={13} className="text-gold" />
          <span>COMPLIMENTARY MAISON COURIER &amp; 3 FREE SAMPLES</span>
        </div>

        {/* Drawer Content / Items list */}
        <div className="santuara-drawer-body">
          {cartItems.length === 0 ? (
            <div className="santuara-drawer-empty">
              <div className="santuara-drawer-empty__icon">
                <ShoppingBag size={32} strokeWidth={1.3} />
              </div>
              <h3 className="santuara-drawer-empty__title">YOUR BAG IS EMPTY</h3>
              <p className="santuara-drawer-empty__desc font-editorial-italic">
                "Each creation is distilled in limited batches. Explore our artisanal extraits and private flacons."
              </p>
              <Link
                to="/collection"
                className="santuara-drawer-empty__btn"
                onClick={closeCartDrawer}
              >
                <span>EXPLORE CREATIONS</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <ul className="santuara-drawer-list">
              {cartItems.map((item) => {
                const itemKey = `${item.id}-${item.size}`
                const itemTotal = item.price * item.quantity
                return (
                  <li key={itemKey} className="santuara-drawer-item">
                    <div className="santuara-drawer-item__img-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="santuara-drawer-item__img"
                      />
                    </div>

                    <div className="santuara-drawer-item__details">
                      <div className="santuara-drawer-item__top">
                        <span className="santuara-drawer-item__conc">
                          {item.concentration}
                        </span>
                        <button
                          type="button"
                          className="santuara-drawer-item__remove"
                          onClick={() => removeFromCart(item.id, item.size)}
                          title="Remove item"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <h4 className="santuara-drawer-item__name">{item.name}</h4>
                      <span className="santuara-drawer-item__size font-editorial-italic">
                        {item.size} • {item.type}
                      </span>

                      <div className="santuara-drawer-item__bottom">
                        {/* Quantity Controls */}
                        <div className="santuara-drawer-qty">
                          <button
                            type="button"
                            className="santuara-drawer-qty__btn"
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="santuara-drawer-qty__val">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="santuara-drawer-qty__btn"
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="santuara-drawer-item__price">
                          ${itemTotal} <span className="santuara-drawer-item__tax">USD</span>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <footer className="santuara-drawer-footer">
            <div className="santuara-drawer-summary">
              <div className="santuara-drawer-summary__row">
                <span>Subtotal</span>
                <span className="santuara-drawer-summary__subtotal">${subtotal} USD</span>
              </div>
              <div className="santuara-drawer-summary__row santuara-drawer-summary__row--subtle">
                <span>Maison Express Courier</span>
                <span className="text-gold">COMPLIMENTARY</span>
              </div>
              <div className="santuara-drawer-summary__row santuara-drawer-summary__row--subtle">
                <span>Authenticity Certificate &amp; Gift Box</span>
                <span className="text-gold">INCLUDED</span>
              </div>
            </div>

            <button
              type="button"
              className="santuara-drawer-checkout-btn"
              onClick={openCheckout}
            >
              <span>PROCEED TO ATELIER CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <div className="santuara-drawer-footer__links">
              <Link
                to="/cart"
                className="santuara-drawer-footer__link"
                onClick={closeCartDrawer}
              >
                <span>VIEW FULL BAG PAGE</span>
              </Link>
            </div>

            <div className="santuara-drawer-security">
              <ShieldCheck size={14} className="text-gold" />
              <span>Santuara Encrypted &amp; Insured International Delivery</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
