import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import useAuth from '../../hooks/useAuth'
import { getLocalStorageToken } from "../../utils/token";
import UserMenu from '../UserMenu'

export default function AuthButtons() {
  const { auth } = useAuth()
  
  if(getLocalStorageToken() && !auth) return null

  return (
    <div className="flex gap-2">
      {
        !auth 
          ? <>
            <LoginModal/>
            <RegisterModal/>
          </>
          : <UserMenu/>
      }
    </div>
  )
}