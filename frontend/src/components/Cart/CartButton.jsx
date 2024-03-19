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
      className="flex justify-center items-center gap-x-2"
    >
      <span>
        <CartIcon fill='#f1c40f'/>
      </span>
      {/* <span>
        Carrito
      </span> */}
    </Link>
  )
}