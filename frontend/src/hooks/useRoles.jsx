import { useEffect, useState } from "react"
import useAuth from "./useAuth"

export default function useRoles() {
  const { user, authIsLoading } = useAuth()
  const [ userRoles, setUserRoles ] = useState({
    isAuthenticated: undefined,
    isStaff: false,
    isTeacher: false,
    isSuperUser: undefined,
    isStaffOrTeacherOrSuperUser: undefined,
    isClient: undefined,
    isClientOrAny: true
  })

  useEffect(() => {
    setUserRoles({
      isAuthenticated: user ? true : false,
      isStaff: user && user?.is_staff,
      isTeacher: user && user?.is_teacher,
      isSuperUser: user && user?.is_superuser ? true : false,
      isStaffOrTeacherOrSuperUser: user && (user?.is_staff || user?.is_teacher || user?.is_superuser),
      isClient: user && !user?.is_staff && !user?.is_teacher && !user?.is_superuser ? true : false,
      isClientOrAny: !user?.is_staff && !user?.is_teacher && !user?.is_superuser
    })
  }, [user])

  return {
    ...userRoles,
    isLoading: authIsLoading
  }
}