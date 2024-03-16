export default function isSuperUser(user) {
  
  if(user)
    if(user.is_superuser) return true
  return false

}