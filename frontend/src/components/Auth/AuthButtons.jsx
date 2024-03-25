import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UserMenu from '../Header/UserMenu'
import useRoles from '../../hooks/useRoles'

export default function AuthButtons() {
  const { isLoading } = useRoles()
  
  // if(getLocalStorageToken() && !auth) return null

  if(isLoading) return null
  return (
    <div className="flex gap-2">
      <UserMenu/>
      <>
        <LoginModal/>
        <RegisterModal/>
      </>
    </div>
  )
}