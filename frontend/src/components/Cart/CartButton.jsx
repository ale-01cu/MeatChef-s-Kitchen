import { Link } from "wouter"
import CartIcon from '../Icons/CartIcon'
import useAuth from "../../hooks/useAuth"

export default function CartButton() {
  const { user } = useAuth()
  
  if(!user || user?.is_superuser) return null
  return (
    <Link to="/carrito" className="bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition">
      <span>
        <CartIcon/>
      </span>
    </Link>
  )
}