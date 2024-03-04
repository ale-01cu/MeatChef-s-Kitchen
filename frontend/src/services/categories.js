import fetching from '../utils/fetching'
import { CATEGORIES_URL } from '../utils/constants'
import { getSessionStorageToken } from '../utils/token'

export const listCategories = async () => {

  const { data }  = await fetching({
    url: CATEGORIES_URL,
    method: 'GET',
    headers: {'content-type': 'aplication/json'},
  })

  return data
}

export const createCategories = async (formData) => {

  const { data }  = await fetching({
    url: CATEGORIES_URL,
    method: 'POST',
    body: formData,
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })
  
  return data
}


