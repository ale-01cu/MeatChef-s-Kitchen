import { CUSTOM_ORDER_URL } from "../utils/constants"
import fetching from "../utils/fetching"
import { getSessionStorageToken } from "../utils/token"

export const createCustomOrder = async (formData) => {
  const { data } = await fetching({
    url: CUSTOM_ORDER_URL,
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}

export const listCustomOrders = async () => {

  const { data }  = await fetching({
    url: CUSTOM_ORDER_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}