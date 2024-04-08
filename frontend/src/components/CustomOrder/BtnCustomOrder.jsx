import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import { Image } from "@nextui-org/react"
import React from "react"

function BtnCustomOrder({ typeSearch }) {
  const { isTeacher, isAuthenticated, isSuperUser, isStaff } = useRoles()

  if(!isAuthenticated || isTeacher || isSuperUser || isStaff) return null
  if(typeSearch === 'cursos') return null
  return (
    <Link 
      to="/orden-personalizada" 
      // className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition"
    >
      <span>
        Pedido Personalizado
      </span>
      {/* <span>
        Pedido Personalizado
      </span> */}
    </Link>
  )
}

const BtnCustomOrderMemo = React.memo(BtnCustomOrder)
export default BtnCustomOrderMemo