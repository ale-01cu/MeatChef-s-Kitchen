import { VERIFY_TOKEN_URL, USER_URL, LOGIN_URL, REGISTER_URL } from "../utils/constants";
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

export const login = async (formData) => {
  const { data } = await fetching({
    url: LOGIN_URL,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  })

  return data
}

export const register = async (formData) => {
  const { data } = await fetching({
    url: REGISTER_URL,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  })

  return data
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