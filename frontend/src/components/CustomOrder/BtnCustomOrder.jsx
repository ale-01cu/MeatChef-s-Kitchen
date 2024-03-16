import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"

export default function BtnCustomOrder() {
  const { isTeacher, isAuthenticated, isSuperUser, isStaff } = useRoles()

  if(!isAuthenticated || isTeacher || isSuperUser || isStaff) return null
  return (
    <Link 
      to="/orden-personalizada" 
      className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
    >
      <span>
        Pedido Personalizado
      </span>
    </Link>
  )
}