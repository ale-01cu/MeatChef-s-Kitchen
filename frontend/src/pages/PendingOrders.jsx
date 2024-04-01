import OrdersList from "../components/Order/OrdersList"
import { useState, useEffect, useCallback } from "react"
import { listStandardOrders } from "../services/standardOrder"
import { listCustomOrders } from "../services/customOrder"
import { Button } from "@nextui-org/react"
import { updateOrderListStatus } from '../services/order'
import { Spinner } from "@nextui-org/react"
import GeneralError from "../components/Errors/GeneralError"

const opciones = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric' 
};

export default function PendingOrders() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isLoadingSubmit, setIsLoadingSubmit ] = useState(false)
  const [ isError, setIsError ] = useState()
  const [ orders, setOrders ] = useState([])
  const [ customOrders, setCustomOrders ] = useState([])

  useEffect(() => {
    setIsLoading(true)
    listStandardOrders()
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
    listCustomOrders()
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


  const handleSubmit = useCallback((selectedRowsState) => {
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
  }, [customOrders, orders])
  

  if(isLoading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
  if(isError) return <GeneralError/>
  return (
    <>
      <div className="p-10">
        <dir>
          <h1 className="p-4 text-3xl font-bold text-center">
            Pedidos Pendientes
          </h1>
        </dir>
        <OrdersList 
          orders={[...orders, ...customOrders]}
          columns={[
            { name: 'Id', selector: row => row.id },
            { name: 'Estado', selector: row => row.status },
            { name: 'Tipo de Envio', selector: row => row.delivery_type },
            { name: 'Metodo de Pago', selector: row => row.payment_method },
            { name: 'Direccion', selector: row => row.address },
            { name: 'Descripcion', selector: row => row.description, cell: row => <p className="p-2">{row.description}</p>, },
            { name: 'Fecha de Creado', selector: row => new Date(row.createAt).toLocaleDateString('es-ES', opciones)},
            { name: 'Tipo de Pedido', selector: row => row.type },
          ]}
          atributes={{
            selectableRows: true,
            expandableRows: true
          }}
          handleSubmit={handleSubmit}
        >
          <Button 
            color='success' 
            variant='solid' 
            isLoading={isLoadingSubmit}
          >
            Marcar Seleccionados como Atendidos
          </Button>
        </OrdersList>
      </div>
    </>
  )
}