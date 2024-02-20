import { deleteToken } from "../utils/token"
import useAuth from '../hooks/useAuth'

export default function Logout() {
  const { setAuth } = useAuth()

  const handleClick = () => {
    const isDelete = deleteToken()
    if(isDelete) setAuth(null)
  }
  
  return (
    <button onClick={handleClick} type="button">
      Cerrar Sesion
    </button> 
  )
}