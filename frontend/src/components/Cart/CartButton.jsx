import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'
import useRoles from "../../hooks/useRoles"

export default function CartButton() {
  const { isClient } = useRoles()

  if(!isClient) return null
  return (
    <Link 
      to="/carrito"
      // className="bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
    >
      <span>
        <CartIcon/>
      </span>
    </Link>
  )
}