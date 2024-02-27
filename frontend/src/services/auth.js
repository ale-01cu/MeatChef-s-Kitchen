import { VERIFY_TOKEN_URL, USER_URL } from "../utils/constants";
import fetching from "../utils/fetching";
import { getSessionStorageToken } from "../utils/token";

export const verifyToken = async () => {
  const token = getSessionStorageToken()
  const { response, data } = await fetching({
    url: VERIFY_TOKEN_URL + '/' + token,
    Headers: {'Content-Type': 'application/json'}
  })

  return {
    res: response,
    data
  }
}


export const getFullUser = async () => {
  const token = getSessionStorageToken()
  const { response, data } = await fetching({
    method: 'GET',
    url: USER_URL,
    headers: {
      'Authorization': token
    }
  })

  return { response, data }
}