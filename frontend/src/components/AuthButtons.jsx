import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import useAuth from '../hooks/useAuth'


export default function AuthButtons() {
  const { auth } = useAuth()
  
  return (
    <div>
      {
        !auth && <>
          <LoginModal/>
          <RegisterModal/>
        </>
      }
    </div>
  )
}