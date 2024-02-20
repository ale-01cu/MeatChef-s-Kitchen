import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import useAuth from '../hooks/useAuth'
import Logout from "./Logout";

export default function AuthButtons() {
  const { auth } = useAuth()
  
  return (
    <div>
      {
        !auth ? <>
          <LoginModal/>
          <RegisterModal/>
        </>
        : <Logout/>
      }
    </div>
  )
}