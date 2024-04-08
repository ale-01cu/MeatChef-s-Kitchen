import { Link } from "wouter"
import useRoles from "../../hooks/useRoles"
import React from "react"

function MeatLinkComponent() {
  const { isSuperUser } = useRoles()

  if(isSuperUser || isSuperUser == undefined) return null
  return (
    <Link to="/carnicos">
      Carnes
    </Link>
  )
}

const MeatLink = React.memo(MeatLinkComponent)
export default MeatLink