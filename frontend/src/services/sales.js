import fetching from '../utils/fetching'
import { 
  LIST_BIGGEST_BUYERS_URL, 
  GET_MOST_SELLED_PRODUCT_URL 
} from '../utils/constants'
import { getSessionStorageToken } from '../utils/token'

export const listBiggestBuyers = async () => {

  const { data }  = await fetching({
    url: LIST_BIGGEST_BUYERS_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })
  return data
}

export const getMostSelledProduct = async () => {
  const { data }  = await fetching({
    url: GET_MOST_SELLED_PRODUCT_URL,
    method: 'GET',
    headers: { 
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}