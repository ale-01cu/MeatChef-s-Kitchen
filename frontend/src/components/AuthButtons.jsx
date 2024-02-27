import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import useAuth from '../hooks/useAuth'
import Logout from "./Logout";
import { getLocalStorageToken } from "../utils/token";


export default function AuthButtons() {
  const { auth } = useAuth()
  
  if(getLocalStorageToken() && !auth) return null

  return (
    <div>
      {
        !auth 
          ? <>
            <LoginModal/>
            <RegisterModal/>
          </>
          : <Logout/>
      }
    </div>
  )
}