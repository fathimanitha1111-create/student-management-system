import React, { useState } from 'react'
import {
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './ContactModal.css'

export default function ContactModal() {
  const { isContactOpen, closeContact } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Olfactory Advice',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  if (!isContactOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({ name: '', email: '', subject: 'Bespoke Olfactory Advice', message: '' })
    closeContact()
  }

  return (
    <div
      className="santuara-modal-backdrop"
      onClick={closeContact}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="santuara-contact-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="santuara-contact-modal__close"
          onClick={closeContact}
          aria-label="Close Contact Modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div className="santuara-contact-modal__grid">
            {/* Left: Contact Info */}
            <div className="santuara-contact-modal__info-side">
              <span className="santuara-contact-modal__eyebrow">
                <Sparkles size={12} className="text-gold" />
                CONCIERGE &amp; PRIVATE SALON
              </span>
              <h2 id="contact-modal-title" className="santuara-contact-modal__title">
                CONNECT WITH OUR PERFUMER
              </h2>
              <p className="santuara-contact-modal__desc font-editorial-italic">
                "Whether seeking a signature fragrance discovery, bespoke formulation, or private tasting reservation, our concierges are at your disposal."
              </p>

              <div className="santuara-contact-channels">
                <a
                  href="mailto:concierge@santuara.com"
                  className="santuara-contact-channel"
                >
                  <div className="santuara-contact-channel__icon">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div className="santuara-contact-channel__text">
                    <span className="santuara-contact-channel__label">DIRECT ATELIER EMAIL</span>
                    <span className="santuara-contact-channel__val">concierge@santuara.com</span>
                  </div>
                </a>

                <a
                  href="tel:+33142685500"
                  className="santuara-contact-channel"
                >
                  <div className="santuara-contact-channel__icon">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div className="santuara-contact-channel__text">
                    <span className="santuara-contact-channel__label">PARIS CONCIERGE DESK</span>
                    <span className="santuara-contact-channel__val">+33 (0)1 42 68 55 00</span>
                  </div>
                </a>

                <div className="santuara-contact-channel">
                  <div className="santuara-contact-channel__icon">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div className="santuara-contact-channel__text">
                    <span className="santuara-contact-channel__label">SALON PRIVÉ &amp; ATELIER</span>
                    <span className="santuara-contact-channel__val">
                      Place Vendôme, Paris &bull; Grasse Cellars, France
                    </span>
                  </div>
                </div>

                <div className="santuara-contact-channel">
                  <div className="santuara-contact-channel__icon">
                    <Clock size={16} className="text-gold" />
                  </div>
                  <div className="santuara-contact-channel__text">
                    <span className="santuara-contact-channel__label">CONCIERGE HOURS</span>
                    <span className="santuara-contact-channel__val">
                      Monday &ndash; Saturday, 09:00 &ndash; 20:00 CET
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="santuara-contact-modal__form-side">
              <form onSubmit={handleSubmit} className="santuara-contact-form">
                <div className="santuara-contact-form__group">
                  <label className="santuara-contact-form__label">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Madame / Monsieur"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="santuara-contact-form__input"
                  />
                </div>

                <div className="santuara-contact-form__group">
                  <label className="santuara-contact-form__label">YOUR EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="santuara-contact-form__input"
                  />
                </div>

                <div className="santuara-contact-form__group">
                  <label className="santuara-contact-form__label">INQUIRY NATURE</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="santuara-contact-form__select"
                  >
                    <option value="Bespoke Olfactory Advice">Bespoke Olfactory Advice</option>
                    <option value="Private Tasting Reservation">Private Tasting Reservation</option>
                    <option value="Flacon Order Status">Flacon Order Status</option>
                    <option value="Artisanal Press & Editorial">Artisanal Press &amp; Editorial</option>
                  </select>
                </div>

                <div className="santuara-contact-form__group">
                  <label className="santuara-contact-form__label">YOUR MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your fragrance preferences, notes of interest, or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="santuara-contact-form__textarea"
                  />
                </div>

                <button type="submit" className="santuara-contact-submit-btn">
                  <span>SEND CONCIERGE INQUIRY</span>
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="santuara-contact-confirmed">
            <div className="santuara-contact-confirmed__icon">
              <CheckCircle2 size={46} className="text-gold" />
            </div>
            <span className="santuara-contact-confirmed__eyebrow">MESSAGE TRANSMITTED</span>
            <h2 className="santuara-contact-confirmed__title">
              MERCI, {formData.name || 'DEAR CLIENT'}
            </h2>
            <p className="santuara-contact-confirmed__desc font-editorial-italic">
              "Your inquiry regarding {formData.subject} has reached our Paris fragrance salon. An olfactory advisor will prepare a tailored response within 24 hours."
            </p>
            <button
              type="button"
              className="santuara-contact-confirmed__btn"
              onClick={handleReset}
            >
              <span>RETURN TO EXPLORATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
