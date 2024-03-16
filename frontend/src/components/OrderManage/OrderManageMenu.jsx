import { Link, useLocation } from 'wouter'
import useRoles from '../../hooks/useRoles'

export default function OrderManageMenu() {
  const [ location ] = useLocation()
  const { isAuthenticated, isStaff } = useRoles()

  if(!isAuthenticated || !isStaff) return null
  return (
    <div className='p-2 flex'>
      <Link 
        to='/pedidos-pendientes'
        className={`hover:bg-warning-400 hover:text-black p-2 rounded-3xl rounded-r-none transition ${location === '/pedidos-pendientes' && 'bg-warning-400 text-black'}`}
      >
        Pedidos Pendientes
      </Link>
      <Link 
        to='/pedidos-atendidos'
        className={`hover:bg-warning-400 hover:text-black p-2 rounded-3xl rounded-l-none transition ${location === '/pedidos-atendidos' && 'bg-warning-400 text-black'}`}
      >
        Pedidos Atendidos
      </Link>
    </div>
  )
}