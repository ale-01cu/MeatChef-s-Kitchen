import { deleteToken } from "../utils/token"
import useAuth from '../hooks/useAuth'

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
    <button onClick={handleClick} type="button">
      Cerrar Sesion
    </button> 
  )
}