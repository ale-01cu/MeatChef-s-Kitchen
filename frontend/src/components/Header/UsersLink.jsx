import { Image } from "@nextui-org/react"
import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import React from "react"

function UsersLinkComponent() {
  const { isSuperUser } = useRoles()

  if(!isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/user">
      Usuarios
    </Link>
  )
}

const UsersLink = React.memo(UsersLinkComponent)
export default UsersLink