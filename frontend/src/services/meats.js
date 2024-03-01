import fetching from '../utils/fetching'
import { MEATS_URL, fILTER_MEATS_BY_CATEGORIES_URL } from '../utils/constants'
import { getSessionStorageToken } from '../utils/token'

export const listMeats = async () => {

  const { response, data }  = await fetching({
    url: MEATS_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })
  if(!response.ok) throw new Error(data.detail)
  return data
}


export const listSearchMeats = async (query) => {

  const { response, data }  = await fetching({
    url: MEATS_URL + '/search/' + query,
    method: 'GET',
  })

  if(!response.ok) throw new Error(data.detail)
  return data
}


export const listMeatsByCategory = async (category_id) => {

  const { response, data }  = await fetching({
    url: fILTER_MEATS_BY_CATEGORIES_URL + '/' + category_id,
    method: 'GET',
  })

  if(!response.ok) throw new Error(data.detail)
  return data
}



export const retrieveMeats = async (meatId) => {
  const { response, data }  = await fetching({
    url: MEATS_URL + '/' + meatId,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })
  if(!response.ok) throw new Error(data.detail)
  return data
}


export const createMeat = async (formData) => {
  const { response, data } = await fetching({
    url: MEATS_URL,
    method: 'POST',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}
  })

  if(!response.ok) throw new Error(data.detail)
  return {
    res: response,  
    data
  }

}