import React from 'react'
import { X, ShieldCheck, Sparkles, FileText, CheckCircle2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './InfoModal.css'

export default function InfoModal() {
  const { infoModalData, closeInfoModal } = useCart()

  if (!infoModalData) return null

  return (
    <div
      className="santuara-modal-backdrop"
      onClick={closeInfoModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        className="santuara-info-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="santuara-info-modal__close"
          onClick={closeInfoModal}
          aria-label="Close information dialog"
        >
          <X size={20} />
        </button>

        <div className="santuara-info-modal__header">
          <div className="santuara-info-modal__eyebrow">
            <Sparkles size={12} className="text-gold" />
            <span>MAISON SANTUARA POLICIES</span>
          </div>
          <h2 id="info-modal-title" className="santuara-info-modal__title">
            {infoModalData.title}
          </h2>
          {infoModalData.subtitle && (
            <p className="santuara-info-modal__subtitle font-editorial-italic">
              "{infoModalData.subtitle}"
            </p>
          )}
          <div className="santuara-info-modal__divider" />
        </div>

        <div className="santuara-info-modal__body">
          {Array.isArray(infoModalData.content) ? (
            infoModalData.content.map((sec, idx) => (
              <div key={idx} className="santuara-info-section">
                <h3 className="santuara-info-section__title">{sec.heading}</h3>
                <p className="santuara-info-section__text">{sec.text}</p>
              </div>
            ))
          ) : (
            <p className="santuara-info-section__text">{infoModalData.content}</p>
          )}
        </div>

        <div className="santuara-info-modal__footer">
          <div className="santuara-info-modal__seal">
            <ShieldCheck size={16} className="text-gold" />
            <span>Certified by Santuara Haute Parfumerie Legal &amp; Atelier Guild</span>
          </div>
          <button
            type="button"
            className="santuara-info-modal__confirm-btn"
            onClick={closeInfoModal}
          >
            <span>UNDERSTOOD</span>
          </button>
        </div>
      </div>
    </div>
  )
}
