import { Image } from "@nextui-org/react"
import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"

export default function CourseLink() {
  const { isSuperUser } = useRoles()

  if(isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/cursos">
      <img src="/Imagen5.png" width={96} height={96}/>
    </Link>
  )
}