import fetching from '../utils/fetching'
import { MEATS_URL, fILTER_MEATS_BY_CATEGORIES_URL } from '../utils/constants'

export const listMeats = async () => {

  const { data }  = await fetching({
    url: MEATS_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  return data
}


export const listSearchMeats = async (query) => {

  const { response, data }  = await fetching({
    url: MEATS_URL + '/search/' + query,
    method: 'GET',
  })

  if(!response.ok) return []
  return data
}


export const listMeatsByCategory = async (category_id) => {

  const { response, data }  = await fetching({
    url: fILTER_MEATS_BY_CATEGORIES_URL + '/' + category_id,
    method: 'GET',
  })

  if(!response.ok) return []
  return data
}



export const retrieveMeats = async (meatId) => {
  const { data }  = await fetching({
    url: MEATS_URL + '/' + meatId,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  return data
}