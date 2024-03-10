import { deleteToken } from "../../utils/token"
import useAuth from '../../hooks/useAuth'
import { useLocation } from 'wouter'

export default function Logout() {
  const { setAuth, setUser } = useAuth()
  const [ location, navegate ] = useLocation()

  const handleClick = () => {
    const isDelete = deleteToken()
    if(isDelete) {
      setAuth(null)
      setUser(null)
      if(location === '/perfil') navegate('/')
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