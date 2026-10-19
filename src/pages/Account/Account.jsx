import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, CheckCircle2, ShieldCheck, ArrowRight, LogOut, Package } from 'lucide-react'
import Footer from '../../components/layout/Footer/Footer'
import '../Pages.css'

export default function Account() {
  const [mode, setMode] = useState('signin')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('concierge@santuara.com')
  const [name, setName] = useState('Valerie de Saint-Germain')

  const handleAuth = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="santuara-page-container">
      <div className="santuara-page__ambient-glow" aria-hidden="true" />
      <div className="santuara-page__inner">
        <header className="santuara-page__header">
          <div className="santuara-page__eyebrow">
            <span className="santuara-page__eyebrow-dot" />
            <span className="santuara-page__eyebrow-text">MAISON PRIVÉ</span>
          </div>
          <h1 className="santuara-page__title">
            {isLoggedIn ? `WELCOME, ${name.toUpperCase()}` : 'WELCOME TO SANTUARA'}
          </h1>
          <p className="santuara-page__subtitle">
            {isLoggedIn
              ? 'Your private salon archives, bespoke formulations, and concierge privileges.'
              : 'Enter your personal sanctuary to manage your private reservations and bespoke formulations.'}
          </p>
          <div className="santuara-page__divider" />
        </header>

        {/* Account Card */}
        <div className="santuara-account-card">
          {!isLoggedIn ? (
            <form className="santuara-account-form" onSubmit={handleAuth}>
              {mode === 'create' && (
                <div className="santuara-form-group">
                  <label className="santuara-form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Madame / Monsieur"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="santuara-form-input"
                  />
                </div>
              )}

              <div className="santuara-form-group">
                <label className="santuara-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="santuara-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="santuara-form-group">
                <label className="santuara-form-label">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="santuara-form-input"
                  defaultValue="santuarapassword"
                />
              </div>

              <div className="santuara-account-btn-group">
                <button
                  type="submit"
                  className="santuara-btn-gold"
                >
                  {mode === 'signin' ? 'ENTER MAISON PRIVÉ' : 'ESTABLISH PATRON ACCOUNT'}
                </button>
                <button
                  type="button"
                  className="santuara-btn-outline"
                  onClick={() => setMode(mode === 'signin' ? 'create' : 'signin')}
                >
                  {mode === 'signin' ? 'SWITCH TO CREATE ACCOUNT' : 'ALREADY REGISTERED? SIGN IN'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={36} className="text-gold" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                PATRON STATUS: PRIVILEGED CIRCLE
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                Member #{email} &bull; Paris Salon Privé Access Granted
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/collection" className="santuara-btn-gold" style={{ padding: '0.75rem 1.5rem', fontSize: '0.7rem' }}>
                  <span>BROWSE ARCHIVE</span>
                  <ArrowRight size={14} style={{ marginLeft: 6 }} />
                </Link>
                <button
                  type="button"
                  className="santuara-btn-outline"
                  onClick={handleLogout}
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.7rem' }}
                >
                  <LogOut size={13} style={{ marginRight: 6 }} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>
          )}

          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              marginTop: '1.5rem',
            }}
          >
            "By entering, you access the private circle of Santuara connoisseurs."
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
