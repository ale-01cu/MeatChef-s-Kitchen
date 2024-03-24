import { deleteToken } from "../../utils/token"
import useAuth from '../../hooks/useAuth'

export default function Logout() {
  const { setUser } = useAuth()

  const handleClick = () => {
    const isDelete = deleteToken()
    if(isDelete) {
      setUser(null)
    }
  }
  
  return (
    <button 
      onClick={handleClick} 
      className="w-full flex"
    >
      Cerrar Sesion
    </button> 
  )
}