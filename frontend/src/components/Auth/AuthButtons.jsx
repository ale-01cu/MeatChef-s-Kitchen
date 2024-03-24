import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UserMenu from '../UserMenu'
import useRoles from '../../hooks/useRoles'

export default function AuthButtons() {
  const { isAuthenticated, isLoading } = useRoles()
  
  // if(getLocalStorageToken() && !auth) return null

  if(isLoading) return null
  return (
    <div className="flex gap-2">
      {
        !isAuthenticated
          ? <>
              <LoginModal/>
              <RegisterModal/>
            </>
          : <UserMenu/>
      }
    </div>
  )
}