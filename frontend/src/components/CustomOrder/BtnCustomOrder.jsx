import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import { Image } from "@nextui-org/react"

export default function BtnCustomOrder() {
  const { isTeacher, isAuthenticated, isSuperUser, isStaff } = useRoles()

  if(!isAuthenticated || isTeacher || isSuperUser || isStaff) return null
  return (
    <Link 
      to="/orden-personalizada" 
      // className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
      className="flex justify-center items-center gap-x-2"
    >
      <span>
        <Image width={16} height={16} src='/RealizarPedidoPersonalizado.png' radius="none"/>
      </span>
      <span>
        Pedido Personalizado
      </span>
    </Link>
  )
}