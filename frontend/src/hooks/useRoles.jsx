import { useEffect, useState } from "react"
import useAuth from "./useAuth"

export default function useRoles() {
  const { user } = useAuth()
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ isStaff, setIsStaff ] = useState(false)
  const [ isTeacher, setIsTeacher ] = useState(false)
  const [ isSuperUser, setIsSuperUser ] = useState(false)
  const [ isStaffOrTeacherOrSuperUser, setIsStaffOrTeacherOrSuperUser ] = useState(true)
  const [ isClient, setIsClient ] = useState(true)
  const [ isClientOrAny, setIsClientOrAny ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    setIsAuthenticated(user ? true : false)
    setIsStaff(user && user?.is_staff)
    setIsTeacher(user && user?.is_teacher)
    setIsSuperUser(user && user?.is_superuser)

    setIsStaffOrTeacherOrSuperUser(
      user && 
      user?.is_staff || 
      user?.is_teacher || 
      user?.is_superuser && true
    )

    setIsClient(
      user &&
      !user?.is_staff &&
      !user?.is_teacher &&
      !user?.is_superuser && true
    )

    setIsClientOrAny(
      !user?.is_staff &&
      !user?.is_teacher &&
      !user?.is_superuser && true
    )
    setIsLoading(false)
  }, [user])


  return {
    isAuthenticated,
    isStaff,
    isTeacher,
    isSuperUser,
    isStaffOrTeacherOrSuperUser,
    isClient,
    isLoading,
    isClientOrAny
  }
}