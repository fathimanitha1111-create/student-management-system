import React from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import './LuxuryToast.css'

export default function LuxuryToast() {
  const { toastMessage, openCartDrawer } = useCart()

  if (!toastMessage) return null

  return (
    <aside className="santuara-global-toast" role="status" aria-live="polite">
      <div className="santuara-global-toast__icon">
        <Check size={16} strokeWidth={2.5} />
      </div>
      <div className="santuara-global-toast__body">
        <span className="santuara-global-toast__title">{toastMessage.title}</span>
        <span className="santuara-global-toast__sub">{toastMessage.subtitle}</span>
      </div>
      <button
        type="button"
        className="santuara-global-toast__btn"
        onClick={openCartDrawer}
      >
        <span>BAG</span>
        <ArrowRight size={13} />
      </button>
    </aside>
  )
}
