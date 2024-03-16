export default function isStaff(user) {
  if(user && user.is_staff)
    return true
  return false

}