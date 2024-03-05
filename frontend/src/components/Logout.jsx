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
    <Button 
      onClick={handleClick} 
      type="button" 
      color="danger" 
      variant="ghost" 
      className="hover:scale-105"
    >
      Cerrar Sesion
    </Button> 
  )
}