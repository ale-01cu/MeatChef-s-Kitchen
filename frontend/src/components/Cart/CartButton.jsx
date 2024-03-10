import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'

export default function CartButton() {
  return (
    <Link to="/carrito" className="bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition">
      <span>
        <CartIcon/>
      </span>
    </Link>
  )
}