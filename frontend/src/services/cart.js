const CART = 'cart'

export const addToCart = (product) => {
  const cart = window.localStorage.getItem(CART)

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

export const getCart = () => {
  const cart = window.localStorage.getItem(CART)
  if(!cart) return []
  return JSON.parse(cart)
}