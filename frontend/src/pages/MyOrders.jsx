import OrdersList from "../components/Order/OrdersList"
import { useState, useEffect } from "react"
import { listStandardOrders } from "../services/standardOrder"
import { listCustomOrders } from "../services/customOrder"
import { ORDER_STATUS } from "../utils/order"

const opciones = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric' 
};

export default function MyOrders() {
  const [ isLoading, setIsLoading ] = useState(false)
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

  if(isLoading) return <h1>Cargando</h1>
  if(isError) return <h1>Revento esta talla</h1>
  return (
    <>
      {/* <MeatMenu/> */}
      <div className="flex flex-col gap-y-5 p-10">
        {

          orders.length > 0 || customOrders.length > 0 
            ? <h1 className="text-3xl font-bold text-center">Mis Pedidos</h1>
            : <h1 className="text-3xl font-bold text-center">No hay Pedidos Realizados</h1>

        }
        
        {
          orders.length > 0 &&
            <section>
              <h1 className="text-xl font-bold py-5">Pedidos</h1>
              <OrdersList 
                orders={orders}
                columns={[
                  { name: 'Id', selector: row => row.id },
                  { name: 'Estado', selector: row => row.status, cell: row => <span className={`text-[${ORDER_STATUS[row.status]}]`}>{row.status}</span> },
                  { name: 'Tipo de Envio', selector: row => row.delivery_type },
                  { name: 'Metodo de Pago', selector: row => row.payment_method },
                  { name: 'Direccion', selector: row => row.address },
                  { name: 'Fecha de Creado', selector: row => new Date(row.createAt).toLocaleDateString('es-ES', opciones)},
                ]}
                atributes={{ expandableRows: true }}
              />
            </section>

        }

        {

          customOrders.length > 0 &&
            <section>
              <h1 className="text-xl font-bold py-5">Pedidos Personalizados</h1>
              <OrdersList 
                orders={customOrders}
                columns={[
                  { name: 'Id', selector: row => row.id },
                  { name: 'Estado', selector: row => row.status, cell: row => <span className={`text-[${ORDER_STATUS[row.status]}]`}>{row.status}</span> },
                  { name: 'Tipo de Envio', selector: row => row.delivery_type },
                  { name: 'Metodo de Pago', selector: row => row.payment_method },
                  { name: 'Direccion', selector: row => row.address },
                  { name: 'Descripcion', selector: row => row.description, cell: row => <p className="p-2">{row.description}</p>, },
                  { name: 'Fecha de Creado', selector: row => new Date(row.createAt).toLocaleDateString('es-ES', opciones)},
                ]}
              />
            </section>

        }
      </div>
    </>
  )
}