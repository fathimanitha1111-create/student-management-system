import React from 'react'
import './Container.css'

/**
 * Responsive layout container for Sentuara
 * @param {'sm' | 'md' | 'lg' | 'full'} size
 */
export default function Container({
  children,
  size = 'lg',
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component className={`sentuara-container sentuara-container--${size} ${className}`} {...props}>
      {children}
    </Component>
  )
}
