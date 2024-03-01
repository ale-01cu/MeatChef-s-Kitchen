import fetching from '../utils/fetching'
import { CATEGORIES_URL } from '../utils/constants'

export const listCategories = async () => {

  const { response, data }  = await fetching({
    url: CATEGORIES_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  if(!response.ok) throw new Error(data.detail)
  return data
}
