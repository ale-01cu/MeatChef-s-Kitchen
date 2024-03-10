import { useEffect, useState } from "react"
import { addToCart, getCart } from "../services/cart"

export default function useCart() {
  const [ cart, setCart ] = useState([])

  useEffect(() => {
    const cart = getCart()
    setCart(cart)
  }, [])

  const addProduct = (prod) => {
    addToCart(prod)
    const newCart = [
      ...cart,
      prod
    ]
    setCart(newCart)
  }

  return {
    cart,
    addProduct
  }
}