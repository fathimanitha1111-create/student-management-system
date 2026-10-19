import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import Container from '../../common/Container/Container'
import GoldDivider from '../../common/GoldDivider/GoldDivider'
import { useCart } from '../../../context/CartContext'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const { openContact, openInfoModal } = useCart()

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (e, targetId) => {
    if (targetId === 'home') {
      if (location.pathname === '/') {
        e.preventDefault()
        scrollToTop()
      }
    } else if (targetId === 'catalog') {
      if (location.pathname === '/') {
        const catEl = document.getElementById('featured-collection')
        if (catEl) {
          e.preventDefault()
          if (window.__lenis) window.__lenis.scrollTo(catEl, { offset: -60, duration: 1.2 })
          else catEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (targetId === 'about') {
      if (location.pathname === '/') {
        const aboutEl = document.getElementById('about-section')
        if (aboutEl) {
          e.preventDefault()
          if (window.__lenis) window.__lenis.scrollTo(aboutEl, { offset: -60, duration: 1.2 })
          else aboutEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const handlePrivacy = (e) => {
    e.preventDefault()
    openInfoModal(
      'Maison Privacy Policy',
      'Confidentiality & Data Dignity at Santuara',
      [
        {
          heading: '1. Atelier Confidentiality',
          text: 'At Santuara, your personal details, bespoke olfactory records, and private acquisition history are protected under strict European confidentiality protocols. We never share or monetize client data.',
        },
        {
          heading: '2. Private Consultation Data',
          text: 'Fragrance profile consultations gathered during private olfactory tastings are stored within secure, encrypted archives accessible exclusively by your designated master perfumer.',
        },
        {
          heading: '3. Encrypted Communications',
          text: 'All transactions, courier reservations, and client inquiries are encrypted with TLS 1.3 military-grade cyphers.',
        },
      ]
    )
  }

  const handleTerms = (e) => {
    e.preventDefault()
    openInfoModal(
      'Terms of Service & Atelier Conditions',
      'Haute Parfumerie Standards & Client Undertakings',
      [
        {
          heading: '1. Limited Harvest Formulations',
          text: 'Due to the scarcity of our Grasse May Rose, Mysore Sandalwood, and natural amber resins, all creations are produced in finite serialized batches. Once a vintage harvest is exhausted, reservations cease.',
        },
        {
          heading: '2. Certificate of Authenticity',
          text: 'Each Santuara obsidian flacon is etched with a unique archive registration number and sealed with our tamper-evident wax seal.',
        },
        {
          heading: '3. White-Glove Guarantee',
          text: 'Every delivery is accompanied by 3 complimentary matching discovery vials so you can sample the fragrance on your skin before unsealing the full-sized flacon box.',
        },
      ]
    )
  }

  const handleShipping = (e) => {
    e.preventDefault()
    openInfoModal(
      'Shipping & Atelier Delivery',
      'White-Glove Insured Delivery Across the Globe',
      [
        {
          heading: '1. Complimentary Maison Courier',
          text: 'Complimentary carbon-neutral express courier is extended on all flacon acquisitions worldwide (2-4 business days).',
        },
        {
          heading: '2. Temperature-Controlled Dispatch',
          text: 'Fragrances are shielded in climate-insulated luxury packaging to protect sensitive volatile botanical oils from temperature fluctuations during transit.',
        },
        {
          heading: '3. 30-Day Tasting Return Policy',
          text: 'Enjoy 30 days to test the included discovery miniature. If the scent does not harmonize with your aura, return the unsealed full flacon for a complete refund or exchange.',
        },
      ]
    )
  }

  const handleClientCare = (e) => {
    e.preventDefault()
    openInfoModal(
      'Client Care & Olfactory Concierge',
      'At Your Immediate Disposal',
      [
        {
          heading: 'Parisian Concierge Desk',
          text: 'Our dedicated fragrance advisors are available Monday through Saturday (09:00 - 20:00 CET) via concierge@santuara.com or by telephone at +33 (0)1 42 68 55 00.',
        },
        {
          heading: 'Private Scent Consultations',
          text: 'Book a bespoke video consultation or in-person private salon session at our Place Vendôme atelier in Paris.',
        },
      ]
    )
  }

  return (
    <footer className="luxury-footer" role="contentinfo">
      <Container size="lg">
        {/* Top Gold Divider with Emblem */}
        <GoldDivider withEmblem={true} spacing="compact" />

        {/* Multi-Column Luxury Footer Grid */}
        <div className="luxury-footer__columns">
          {/* Col 1: Maison Brand */}
          <div className="luxury-footer__col luxury-footer__col--brand">
            <h3 className="luxury-footer__col-title">SANTUARA</h3>
            <p className="luxury-footer__brand-desc font-editorial-italic">
              "More than a fragrance, it's a presence. Crafted from rare botanicals and aged resins for those who leave an indelible impression."
            </p>
            <div className="luxury-footer__origin">
              <Sparkles size={13} className="text-gold" />
              <span>PARIS &bull; GRASSE &bull; HAUTE PARFUMERIE</span>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div className="luxury-footer__col">
            <h4 className="luxury-footer__heading">THE CREATIONS</h4>
            <ul className="luxury-footer__nav-list">
              <li>
                <Link
                  to="/"
                  className="luxury-footer__nav-link"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home / Presentation
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="luxury-footer__nav-link"
                  onClick={(e) => handleNavClick(e, 'catalog')}
                >
                  All Fragrances / Catalog
                </Link>
              </li>
              <li>
                <Link to="/men" className="luxury-footer__nav-link">
                  Santuara Men (Pour Homme)
                </Link>
              </li>
              <li>
                <Link to="/women" className="luxury-footer__nav-link">
                  Santuara Women (Pour Femme)
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="luxury-footer__nav-link"
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  Our Story / The Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Client Care */}
          <div className="luxury-footer__col">
            <h4 className="luxury-footer__heading">CONCIERGE &amp; SERVICES</h4>
            <ul className="luxury-footer__nav-list">
              <li>
                <button
                  type="button"
                  className="luxury-footer__action-link"
                  onClick={openContact}
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="luxury-footer__action-link"
                  onClick={openContact}
                >
                  Bespoke Olfactory Advice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="luxury-footer__action-link"
                  onClick={handleShipping}
                >
                  Shipping &amp; Complimentary Courier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="luxury-footer__action-link"
                  onClick={handleClientCare}
                >
                  Client Care &amp; Private Tasting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier & Salon Privé */}
          <div className="luxury-footer__col">
            <h4 className="luxury-footer__heading">SALON PRIVÉ</h4>
            <p className="luxury-footer__address">
              14 Place Vendôme, 75001 Paris, France<br />
              Atelier des Parfums, Grasse
            </p>
            <div className="luxury-footer__contact-direct">
              <button
                type="button"
                className="luxury-footer__concierge-btn"
                onClick={openContact}
              >
                <span>CONNECT WITH PERFUMER</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="luxury-footer__bottom-divider" />

        {/* Bottom Bar: Copyright, Legal Links, Scroll to top */}
        <div className="luxury-footer__bottom">
          <p className="luxury-footer__copy">
            &copy; {new Date().getFullYear()} SANTUARA PARFUMS PARIS. TOUS DROITS RÉSERVÉS.
          </p>

          <div className="luxury-footer__links">
            <button
              type="button"
              className="luxury-footer__link"
              onClick={handlePrivacy}
            >
              Privacy Policy
            </button>
            <span className="luxury-footer__separator">&bull;</span>
            <button
              type="button"
              className="luxury-footer__link"
              onClick={handleTerms}
            >
              Terms of Service
            </button>
            <span className="luxury-footer__separator">&bull;</span>
            <button
              type="button"
              className="luxury-footer__link"
              onClick={handleClientCare}
            >
              Client Care
            </button>
          </div>

          {/* Scroll to Top Button */}
          <button
            type="button"
            className="luxury-footer__scroll-top"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            title="Return to top"
          >
            <span>TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </Container>
    </footer>
  )
}
