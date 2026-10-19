import React from 'react'
import './GoldDivider.css'

/**
 * Luxury Gold Divider with optional emblem icon in center
 */
export default function GoldDivider({
  withEmblem = true,
  className = '',
  spacing = 'normal' // 'compact' | 'normal' | 'spacious'
}) {
  return (
    <div className={`gold-divider gold-divider--${spacing} ${className}`} role="separator">
      <div className="gold-divider__line gold-divider__line--left" />
      {withEmblem && (
        <div className="gold-divider__emblem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <polygon
              points="12,2 22,12 12,22 2,12"
              stroke="var(--gold-primary)"
              strokeWidth="1.5"
              fill="rgba(212, 175, 55, 0.15)"
            />
            <circle cx="12" cy="12" r="2.5" fill="var(--gold-light)" />
          </svg>
        </div>
      )}
      <div className="gold-divider__line gold-divider__line--right" />
    </div>
  )
}
