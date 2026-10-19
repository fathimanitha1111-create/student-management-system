import React from 'react'
import './GlassCard.css'

/**
 * Luxury Glassmorphic Card Container for notes, fragrances, and artisanal features
 */
export default function GlassCard({
  children,
  className = '',
  interactive = false,
  glowOnHover = true,
  onClick,
  ...props
}) {
  return (
    <div
      className={`glass-card ${interactive ? 'glass-card--interactive' : ''} ${glowOnHover ? 'glass-card--glow' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="glass-card__top-highlight" />
      <div className="glass-card__content">
        {children}
      </div>
    </div>
  )
}
