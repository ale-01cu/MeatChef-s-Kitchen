import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UserMenu from '../UserMenu'
import useRoles from '../../hooks/useRoles'

export default function AuthButtons() {
  const { isAuthenticated, isLoading } = useRoles()
  
  // if(getLocalStorageToken() && !auth) return null

  if(isLoading) return null
  if(!isAuthenticated) 
    return (
      <div className="flex gap-2">
        <LoginModal/>
        <RegisterModal/>
      </div>
    )
  return (
    <div className="flex gap-2">
      <UserMenu/>
    </div>
  )
}