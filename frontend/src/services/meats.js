import fetching from '../utils/fetching'
import { MEATS_URL, fILTER_MEATS_BY_CATEGORIES_URL } from '../utils/constants'
import { getSessionStorageToken } from '../utils/token'

export const listMeats = async () => {

  const { data }  = await fetching({
    url: MEATS_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })
  return data
}


export const listSearchMeats = async (query) => {

  const { data }  = await fetching({
    url: MEATS_URL + '/search/' + query,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}


export const listMeatsByCategory = async (category_id) => {

  const { data }  = await fetching({
    url: fILTER_MEATS_BY_CATEGORIES_URL + '/' + category_id,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}



export const retrieveMeats = async (meatId) => {
  const { data }  = await fetching({
    url: MEATS_URL + '/' + meatId,
    method: 'GET',
    headers: { 
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}


export const createMeat = async (formData) => {
  const { response, data } = await fetching({
    url: MEATS_URL,
    method: 'POST',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}
  })

  return {
    res: response,  
    data
  }

}


export const updateMeat = async (meatId, formData) => {
  const { data } = await fetching({
    url: MEATS_URL + '/' + meatId,
    method: 'PUT',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}

  })

  return data

}


export const deleteMeat = async (meatId) => {
  await fetch(MEATS_URL + '/' + meatId, {
    method: 'DELETE',
    headers: {'authorization': getSessionStorageToken()}
  })
}