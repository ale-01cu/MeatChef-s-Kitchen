import { STANDARD_ORDER_URL } from "../utils/constants"
import fetching from "../utils/fetching"
import { getSessionStorageToken } from "../utils/token"

export const createStandardOrder = async (formData) => {
  const { data } = await fetching({
    url: STANDARD_ORDER_URL,
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}

export const listStandardOrders = async () => {

  const { data }  = await fetching({
    url: STANDARD_ORDER_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}

export const listProcessedStandardOrders = async () => {

  const { data }  = await fetching({
    url: STANDARD_ORDER_URL + '-processed',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}