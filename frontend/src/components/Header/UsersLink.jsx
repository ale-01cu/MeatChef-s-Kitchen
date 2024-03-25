import { Image } from "@nextui-org/react"
import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"

export default function UsersLink() {
  const { isSuperUser } = useRoles()

  if(!isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/user">
      Usuarios
    </Link>
  )
}