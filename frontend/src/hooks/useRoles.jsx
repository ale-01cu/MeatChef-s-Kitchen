import { useEffect, useState } from "react"
import useAuth from "./useAuth"

export default function useRoles() {
  const { user, authIsLoading } = useAuth()
  const [userRoles, setUserRoles] = useState({
    isAuthenticated: false,
    isStaff: false,
    isTeacher: false,
    isSuperUser: false,
    isStaffOrTeacherOrSuperUser: true,
    isClient: true,
    isClientOrAny: true
  })

  useEffect(() => {
    setUserRoles({
      isAuthenticated: user ? true : false,
      isStaff: user && user?.is_staff,
      isTeacher: user && user?.is_teacher,
      isSuperUser: user && user?.is_superuser,
      isStaffOrTeacherOrSuperUser: user && (user?.is_staff || user?.is_teacher || user?.is_superuser),
      isClient: user && !user?.is_staff && !user?.is_teacher && !user?.is_superuser,
      isClientOrAny: !user?.is_staff && !user?.is_teacher && !user?.is_superuser
    })
  }, [user])

  return {
    ...userRoles,
    isLoading: authIsLoading
  }
}


// export default function useRoles() {
//   const { user, authIsLoading } = useAuth()
//   const [ isAuthenticated, setIsAuthenticated ] = useState(false)
//   const [ isStaff, setIsStaff ] = useState(false)
//   const [ isTeacher, setIsTeacher ] = useState(false)
//   const [ isSuperUser, setIsSuperUser ] = useState(false)
//   const [ isStaffOrTeacherOrSuperUser, setIsStaffOrTeacherOrSuperUser ] = useState(true)
//   const [ isClient, setIsClient ] = useState(true)
//   const [ isClientOrAny, setIsClientOrAny ] = useState(true)
//   const [ loading, setLoading ] = useState(true)
  

//   useEffect(() => {
//     setIsAuthenticated(user ? true : false)

//   }, [user])
//   useEffect(() => setIsStaff(user && user?.is_staff), [user])
//   useEffect(() => setIsTeacher(user && user?.is_teacher), [user])
//   useEffect(() => setIsSuperUser(user && user?.is_superuser), [user])
//   useEffect(() => setIsStaffOrTeacherOrSuperUser(
//     user && 
//     user?.is_staff || 
//     user?.is_teacher || 
//     user?.is_superuser && true
//   ), [user])
//   useEffect(() => setIsClient(
//     user &&
//     !user?.is_staff &&
//     !user?.is_teacher &&
//     !user?.is_superuser && true
//   ), [user])
//   useEffect(() => setIsClientOrAny(
//     !user?.is_staff &&
//     !user?.is_teacher &&
//     !user?.is_superuser && true
//   ), [user])

//   return {
//     isAuthenticated,
//     isStaff,
//     isTeacher,
//     isSuperUser,
//     isStaffOrTeacherOrSuperUser,
//     isClient,
//     isLoading: authIsLoading,
//     isClientOrAny
//   }
// }