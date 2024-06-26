import { Image } from "@nextui-org/react"
import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import React from "react"

function CourseLinkComponent() {
  const { isSuperUser } = useRoles()

  if(isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/cursos">
      Cursos
    </Link>
  )
}

const CourseLink = React.memo(CourseLinkComponent)
export default CourseLink