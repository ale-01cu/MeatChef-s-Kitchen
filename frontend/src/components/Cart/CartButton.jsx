import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'

export default function CartButton() {
  return (
    <Link to="/carrito" className="">
      <CartIcon/>
    </Link>
  )
}