import fetching from '../utils/fetching'
import { 
  USER_URL, 
  LIST_USERS_URL, 
  UPDATE_USER_BY_ADMIN_URL, 
  SEARCH_USERS_URL,
  AVATAR_URL
} from '../utils/constants'
import {getSessionStorageToken} from '../utils/token'

export const listUsers = async () => {

  const { data }  = await fetching({
    url: LIST_USERS_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
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

export const getUser = async (userId) => {
  const token = getSessionStorageToken()
  const { data } = await fetching({
    method: 'GET',
    url: USER_URL + '/' + userId,
    headers: { 'Authorization': token }
  })

  return data
}

export const listSearchUsers = async (query) => {

  const { data }  = await fetching({
    url: SEARCH_USERS_URL + '/search/' + query,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}


export const createUser = async (formData) => {
  const { data } = await fetching({
    url: USER_URL,
    method: 'POST',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}
  })

  return data

}


export const updateUser = async (userId, formData) => {
  const { data } = await fetching({
    url: UPDATE_USER_BY_ADMIN_URL + '/' + userId,
    method: 'PUT',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}

  })

  return data

}

export const updateAvatar = async (formData, userId) => {
  const res = await fetch(AVATAR_URL + '/' + userId, {
    method: 'PUT',
    body: formData,
    headers: { 'authorization': getSessionStorageToken() }
  })

  if(!res.ok) {
    const data = await res.json()
    throw new Error(data.detail)
  }
}


export const deleteUser = async (userId) => {
  const res = await fetch(USER_URL + '/' + userId, {
    method: 'DELETE',
    headers: {'authorization': getSessionStorageToken()}
  })

  if(!res.ok) {
    const data = await res.json()
    throw new Error(data.detail)
  }

}