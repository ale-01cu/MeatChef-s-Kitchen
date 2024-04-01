import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'
import useRoles from "../../hooks/useRoles"
import React from "react"

function CartButton() {
  const { isClient } = useRoles()

  if(!isClient || isClient == undefined) return null
  return (
    <Link 
      to="/carrito"
      // className="bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
      className="flex justify-center items-center gap-x-2"
    >
      <span>
        <CartIcon fill='#ff990f'/>
      </span>
      {/* <span>
        Carrito
      </span> */}
    </Link>
  )
}

const CartButtonMemo = React.memo(CartButton)
export default CartButtonMemo