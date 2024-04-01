import { Image } from "@nextui-org/react"
import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import React from "react"

function CourseLinkComponent() {
  const { isSuperUser } = useRoles()

  if(isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/cursos">
      <img src="/Imagen5.png" width={96} height={96}/>
    </Link>
  )
}

const CourseLink = React.memo(CourseLinkComponent)
export default CourseLink