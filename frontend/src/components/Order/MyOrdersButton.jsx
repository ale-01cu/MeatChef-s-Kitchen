import { Link } from 'wouter'
import useAuth from '../../hooks/useAuth'
import useRoles from '../../hooks/useRoles'
import { Image } from '@nextui-org/react'
import React from 'react'

function MyOrdersButton({ typeSearch }) {
  const { isAuthenticated, isStaffOrTeacherOrSuperUser } = useRoles()

  if(!isAuthenticated 
    || isAuthenticated === undefined 
    || isStaffOrTeacherOrSuperUser
    || isStaffOrTeacherOrSuperUser === undefined) return null
  if(typeSearch === 'cursos') return null
  return (
    <Link 
      to='/mis-pedidos' 
      // className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
      className=""

    >
      <span>
        Mis Pedidos
      </span>
      {/* <span>
        Mis Pedidos
      </span> */}
    </Link>
  )
}

const MyOrdersButtonMemo = React.memo(MyOrdersButton)
export default MyOrdersButtonMemo