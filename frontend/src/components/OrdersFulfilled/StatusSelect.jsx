import { updateOrderListStatus } from "../../services/order"
import { Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"

const STATUS = [
  'recivido',
  'procesado',
  'enviado',
  'completo',
  'cancelado'
]

const StatusSelect = ({ orderId, statusDefault }) => {
  const [ isLoading, setIsLoading ] = useState(false)

  const handleChange = (e) => {
    const status = e.target.value
    const formData = [
      { id: orderId, status }
    ]
    setIsLoading(true)
    updateOrderListStatus(formData)
      .then()
      .catch(e => {console.error(e);})
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Select
      isRequired
      aria-label="Estado de la Orden"
      variant="faded"
      labelPlacement="outside"
      defaultSelectedKeys={[statusDefault]}
      onChange={handleChange}
      isLoading={isLoading}
      className=""
    >
      {
        STATUS.map((status) => (
          <SelectItem 
            key={status} 
            value={status}
          >
            {status}
          </SelectItem>
        ))
      }
    
    </Select>
  )
}


export default StatusSelect