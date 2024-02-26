import { IS_TEACHER_URL } from "../utils/constants";
import { getSessionStorageToken } from "../utils/token";

export const isTeacherPermission = async () => {

  const res = await fetch(IS_TEACHER_URL, {
    method: 'GET',
    headers: {
      'Authorization': getSessionStorageToken()
    }
  })


  if(!res.ok) return false
  return true
}