import { useEffect, useState } from "react"
import useAuth from "./useAuth"

export default function usePrueba() {
  const { user, authIsLoading } = useAuth()
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  
  // useEffect(() => {
  //   if(user) {
  //     setIsAuthenticated(user ? true : false)
  //     setIsStaff(user && user?.is_staff)
  //     setIsTeacher(user && user?.is_teacher)
  //     setIsSuperUser(user && user?.is_superuser)
  
  //     setIsStaffOrTeacherOrSuperUser(
  //       user && 
  //       user?.is_staff || 
  //       user?.is_teacher || 
  //       user?.is_superuser && true
  //     )
  
  //     setIsClient(
  //       user &&
  //       !user?.is_staff &&
  //       !user?.is_teacher &&
  //       !user?.is_superuser && true
  //     )
  
  //     setIsClientOrAny(
  //       !user?.is_staff &&
  //       !user?.is_teacher &&
  //       !user?.is_superuser && true
  //     )
  //     setLoading(false)
  //   }
  // }, [user])

  useEffect(() => {
    console.log('Efecto autenticado');
    console.log(isAuthenticated);
    setIsAuthenticated(user ? true : false)
    console.log('Efecto autenticado termino');
    console.log(isAuthenticated);

  }, [user])
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

  return {
    loading
  }
}