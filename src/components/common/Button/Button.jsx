import React from 'react'
import './Button.css'

/**
 * Luxury Button Component for Sentuara
 * @param {'primary' | 'outline' | 'ghost' | 'link'} variant
 * @param {'sm' | 'md' | 'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  onClick,
  className = '',
  disabled = false,
  ...props
}) {
  const Component = href ? 'a' : 'button'
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim()

  const content = (
    <>
      <span className="btn__shimmer" aria-hidden="true" />
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
    </>
  )

  return (
    <Component
      className={buttonClass}
      href={href}
      onClick={onClick}
      disabled={Component === 'button' ? disabled : undefined}
      {...props}
    >
      {content}
    </Component>
  )
}
