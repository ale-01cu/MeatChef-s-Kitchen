import { deleteToken } from "../utils/token"
import useAuth from '../hooks/useAuth'
import { Button } from "@nextui-org/react"

export default function Logout() {
  const { setAuth, setMyUser } = useAuth()

  const handleClick = () => {
    const isDelete = deleteToken()
    if(isDelete) {
      setAuth(null)
      setMyUser()
    }
  }
  
  return (
    <button 
      onClick={handleClick} 
    >
      Cerrar Sesion
    </button> 
  )
}