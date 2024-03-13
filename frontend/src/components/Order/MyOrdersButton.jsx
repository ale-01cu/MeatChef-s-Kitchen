import { Link } from 'wouter'
import useAuth from '../../hooks/useAuth'

export default function MyOrdersButton() {
  const { user } = useAuth()

  if(!user || user?.is_superuser) return null
  return (
    <Link to='/mis-pedidos' className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition">
      <span>
        Mis Pedidos
      </span>
    </Link>
  )
}