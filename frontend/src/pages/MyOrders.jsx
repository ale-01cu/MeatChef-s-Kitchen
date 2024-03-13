import OrdersList from "../components/Order/OrdersList"
import MeatMenu from "../components/MeatMenu"
import { useState, useEffect } from "react"
import { listOrders } from "../services/order"
import { listCustomOrders } from "../services/customOrder"

export default function MyOrders() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()
  const [ orders, setOrders ] = useState([])
  const [ customOrders, setCustomOrders ] = useState([])



  useEffect(() => {
    setIsLoading(true)
    listOrders()
      .then((data) => {
        setOrders(data)
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
        setCustomOrders(data)
      })
      .catch((e) => {
        setIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setIsLoading. setIsError])


  if(isLoading) return <h1>Cargando</h1>
  return (
    <>
      <MeatMenu/>
      <div className="flex flex-col gap-y-5 p-10">
        <h1 className="text-3xl font-bold text-center">Mis Pedidos</h1>
        { isError && <h1>Revento esta talla</h1> }
        <section>
          <h1 className="text-xl font-bold py-5">Pedidos</h1>
          <OrdersList orders={orders}/>
        </section>
        <section>
          <h1 className="text-xl font-bold py-5">Pedidos Personalizados</h1>
          <OrdersList orders={customOrders}/>
        </section>
      </div>
    </>
  )
}