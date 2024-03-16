import { ORDER_URL } from "../utils/constants"
import { getSessionStorageToken } from "../utils/token"
import fetching from "../utils/fetching"

export const updateOrderListStatus = async (formData) => {
  const { data } = await fetching({
    url: ORDER_URL,
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}
