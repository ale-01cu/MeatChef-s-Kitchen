const CART = 'cart'

export const addToCart = (product) => {
  const cart = window.localStorage.getItem(CART)
  product.amount = 1

  if(!cart) {
    window.localStorage.setItem(
      CART, 
      JSON.stringify([product])
    )
  
  }else {
    const cartObject = JSON.parse(cart)
    const found = cartObject.find((value) => value.id === product.id)
    if(found) throw new Error('Product already in the cart.')

    const newCartObject = [
      ...cartObject,
      product
    ]
  
    window.localStorage.setItem(
      CART, 
      JSON.stringify(newCartObject)
    )

  }
}

export const updateAmountCart = (id, amount) => {
  const cartObject = getCart()

  const newCart = cartObject.map(prod => {
    if(prod.id === id) prod.amount = amount
    return prod
  })

  window.localStorage.setItem(CART, JSON.stringify(newCart))
}


export const deleteProductFromCart = (id) => {
  const cartObject = getCart()
  const newCart = cartObject.filter((prod) => prod.id !== id)
  window.localStorage.setItem(CART, JSON.stringify(newCart))

}


export const clearCart = () => {
  window.localStorage.removeItem(CART)
}

export const productIsInCart = (prodId) => {
  const cart = getCart()
  const found = cart.find((prod) => prod.id === prodId)
  if(found) return true
  return false

}


export const getCart = () => {
  const cart = window.localStorage.getItem(CART)
  if(!cart) return []
  return JSON.parse(cart)
}