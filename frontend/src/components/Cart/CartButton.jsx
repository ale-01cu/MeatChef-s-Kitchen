import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'
import useRoles from "../../hooks/useRoles"
import React from "react"

function CartButton({ typeSearch }) {
  const { isClient } = useRoles()

  if(!isClient || isClient == undefined) return null
  if(typeSearch === 'cursos') return null
  return (
    <Link 
      to="/carrito"
      // className="bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
    >
      <span>
        Carrito
      </span>
      {/* <span>
        Carrito
      </span> */}
    </Link>
  )
}

const CartButtonMemo = React.memo(CartButton)
export default CartButtonMemo