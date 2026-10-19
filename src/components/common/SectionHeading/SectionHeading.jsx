import React from 'react'
import './SectionHeading.css'

/**
 * Luxury Section Heading with Overline, Serif Title and Editorial Description
 */
export default function SectionHeading({
  overline,
  title,
  highlightWord,
  description,
  align = 'center',
  className = '',
  light = false
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`}>
      {overline && (
        <div className="section-heading__overline-wrap">
          <span className="section-heading__bullet" />
          <span className="section-heading__overline">{overline}</span>
          <span className="section-heading__bullet" />
        </div>
      )}

      {title && (
        <h2 className="section-heading__title">
          {title}{' '}
          {highlightWord && (
            <span className="section-heading__highlight">{highlightWord}</span>
          )}
        </h2>
      )}

      {description && (
        <p className={`section-heading__description ${light ? 'section-heading__description--light' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
