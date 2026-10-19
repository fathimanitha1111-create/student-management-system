import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // 1. Cart Items with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('santuara_cart')
      return saved ? JSON.parse(saved) : [
        // Pre-populate with 1 signature item for instant demonstration
        {
          id: 'santuara-noir',
          name: 'Santuara Noir',
          size: '50ml',
          price: 120,
          quantity: 1,
          image: '/images/santuara_men.jpg',
          type: 'Woody · Amber',
          concentration: 'Extrait de Parfum',
        }
      ]
    } catch {
      return []
    }
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('santuara_cart', JSON.stringify(cartItems))
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, [cartItems])

  // Modals & Drawers States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [infoModalData, setInfoModalData] = useState(null) // { title, subtitle, content }
  const [toastMessage, setToastMessage] = useState(null)

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Toast trigger helper
  const showToast = (title, subtitle) => {
    setToastMessage({ title, subtitle })
    setTimeout(() => {
      setToastMessage(null)
    }, 3800)
  }

  // Add To Cart
  const addToCart = (product, size = '50ml', quantity = 1) => {
    const unitPrice = size === '100ml' && product.price100ml ? product.price100ml : product.price

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      )

      if (existingIndex > -1) {
        const next = [...prevItems]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        }
        return next
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            size,
            price: unitPrice,
            quantity,
            image: product.image,
            type: product.type || 'Haute Parfumerie',
            concentration: product.concentration || 'Extrait de Parfum',
          },
        ]
      }
    })

    showToast(
      `${product.name} (${size})`,
      `Added to your Shopping Bag — $${unitPrice * quantity}`
    )
  }

  // Remove From Cart
  const removeFromCart = (productId, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && item.size === size)))
  }

  // Update Quantity (+1, -1)
  const updateQuantity = (productId, size, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId && item.size === size) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  // Clear Cart
  const clearCart = () => {
    setCartItems([])
  }

  // Drawers & Modals Handlers
  const openCartDrawer = () => setIsCartDrawerOpen(true)
  const closeCartDrawer = () => setIsCartDrawerOpen(false)
  const toggleCartDrawer = () => setIsCartDrawerOpen((v) => !v)

  const openQuickView = (product) => setQuickViewProduct(product)
  const closeQuickView = () => setQuickViewProduct(null)

  const openCheckout = () => {
    setIsCartDrawerOpen(false)
    setIsCheckoutOpen(true)
  }
  const closeCheckout = () => setIsCheckoutOpen(false)

  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)

  const openInfoModal = (title, subtitle, content) => {
    setInfoModalData({ title, subtitle, content })
  }
  const closeInfoModal = () => setInfoModalData(null)

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartDrawerOpen(false)
        setQuickViewProduct(null)
        setIsCheckoutOpen(false)
        setIsContactOpen(false)
        setInfoModalData(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        // Drawer
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        // Quick view
        quickViewProduct,
        openQuickView,
        closeQuickView,
        // Checkout
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        // Contact
        isContactOpen,
        openContact,
        closeContact,
        // Info modal
        infoModalData,
        openInfoModal,
        closeInfoModal,
        // Toast
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
