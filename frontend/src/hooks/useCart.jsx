import { useEffect, useState } from "react"
import { getCart, deleteProductFromCart, clearCart } from "../services/cart"

export default function useCart() {
  const [ cart, setCart ] = useState([])

  useEffect(() => {
    const cart = getCart()
    setCart(cart)
  }, [])

  const deleteProduct = (id) => {
    setCart(prev => prev.filter((prod) => prod.id !== id))
    deleteProductFromCart(id)
  }

  const clear = () => {
    clearCart()
    setCart([])
  }

  return {
    cart,
    deleteProduct,
    clear
  }
}