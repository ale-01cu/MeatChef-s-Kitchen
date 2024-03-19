import { Link } from 'wouter'
import useAuth from '../../hooks/useAuth'
import useRoles from '../../hooks/useRoles'
import { Image } from '@nextui-org/react'

export default function MyOrdersButton() {
  const { isAuthenticated, isStaffOrTeacherOrSuperUser } = useRoles()

  if(!isAuthenticated || isStaffOrTeacherOrSuperUser) return null
  return (
    <Link 
      to='/mis-pedidos' 
      // className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
      className="flex justify-center items-center gap-x-2"

    >
      <span>
        <Image width={16} height={16} src='/PedidosPendientes.png'/>
      </span>
      {/* <span>
        Mis Pedidos
      </span> */}
    </Link>
  )
}