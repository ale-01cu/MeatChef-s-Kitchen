import fetching from '../utils/fetching'
import { CATEGORIES_URL } from '../utils/constants'

export const listCategories = async () => {

  const { data }  = await fetching({
    url: CATEGORIES_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  return data
}
