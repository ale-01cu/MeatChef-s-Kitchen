import { Link } from "wouter"
import useAuth from "../../hooks/useAuth"

export default function BtnCustomOrder() {
  const { user } = useAuth()

  if(!user || user?.is_superuser) return null
  return (
    <Link to="/orden-personalizada" className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition">
      <span>
        Pedido Personalizado
      </span>
    </Link>
  )
}