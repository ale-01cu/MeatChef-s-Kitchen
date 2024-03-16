import OrdersList from "../components/Order/OrdersList"
import { useState, useEffect } from "react"
import { listProcessedStandardOrders } from "../services/standardOrder"
import { listProcessedCustomOrders } from "../services/customOrder"
import { updateOrderListStatus } from '../services/order'
import MeatMenu from "../components/MeatMenu"

const opciones = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric' 
};

export default function OrdersFulfilled() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isLoadingSubmit, setIsLoadingSubmit ] = useState(false)
  const [ isError, setIsError ] = useState()
  const [ orders, setOrders ] = useState([])
  const [ customOrders, setCustomOrders ] = useState([])

  useEffect(() => {
    setIsLoading(true)
    listProcessedStandardOrders()
      .then((data) => {
        setOrders(data.map((d) => {
          return { ...d, type: 'Estandar' }
        }))
      })
      .catch((e) => {
        setIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setIsLoading, setIsError])


  useEffect(() => {
    setIsLoading(true)
    listProcessedCustomOrders()
      .then((data) => {
        setCustomOrders(data.map((d) => {
          return { ...d, type: 'Personalizado' }
        }))
      })
      .catch((e) => {
        setIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setIsLoading. setIsError])


  const handleSubmit = (selectedRowsState) => {
    setIsLoadingSubmit(true)
    updateOrderListStatus(selectedRowsState.map((prod) => {
      return {
        id: prod.id,
        status: 'procesado'
      }
    }))
      .then(() => {
        setOrders(orders.filter(order => !selectedRowsState.some(row => row.id === order.id)))
        setCustomOrders(customOrders.filter(order => !selectedRowsState.some(row => row.id === order.id)))
      })
      .catch((e) => {
        setIsError(e)
      })
      .finally(() => {
        setIsLoadingSubmit(false)
      })
  }
  


  if(isLoading) return <h1>Cargando</h1>
  return (
    <>
      <MeatMenu/>
      <div className="p-10">
        <dir>
          <h1 className="p-4 text-3xl font-bold text-center">
            Pedidos Atendidos
          </h1>
        </dir>
        <div>
          { isError && <h1>Revento esta talla</h1> }
        </div>
        <OrdersList 
          orders={[...orders, ...customOrders]}
          columns={[
            { name: 'Id', selector: row => row.id },
            { name: 'Estado', selector: row => row.status },
            { name: 'Tipo de Envio', selector: row => row.delivery_type },
            { name: 'Metodo de Pago', selector: row => row.payment_method },
            { name: 'Fecha de Creado', selector: row => new Date(row.createAt).toLocaleDateString('es-ES', opciones)},
            { name: 'Tipo de Pedido', selector: row => row.type },
          ]}
          atributes={{
            selectableRows: true,
            expandableRows: true
          }}
          handleSubmit={handleSubmit}
        >
        </OrdersList>
      </div>
    
    </>
  )
}