import { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cartItemsInLs = localStorage.getItem('cart')

    if (cartItemsInLs?.length) {
      setCart(JSON.parse(cartItemsInLs))
    }
  }, [])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
