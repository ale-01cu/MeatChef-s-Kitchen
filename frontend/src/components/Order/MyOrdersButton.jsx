import { Link } from 'wouter'
import useAuth from '../../hooks/useAuth'
import useRoles from '../../hooks/useRoles'

export default function MyOrdersButton() {
  const { isAuthenticated, isStaffOrTeacherOrSuperUser } = useRoles()

  if(!isAuthenticated || isStaffOrTeacherOrSuperUser) return null
  return (
    <Link to='/mis-pedidos' /*className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"*/>
      <span>
        Mis Pedidos
      </span>
    </Link>
  )
}