import OrderForm from "../components/Order/OrderForm"
import CartList from "../components/Cart/CartList"
import { Button } from "@nextui-org/react"
import MeatMenu from "../components/Meats/MeatMenu"
import { useState } from "react"
import { createStandardOrder } from "../services/standardOrder"
import useCart from "../hooks/useCart"
import { toast } from 'react-toastify'
import useAuth from "../hooks/useAuth"
import useRoles from "../hooks/useRoles"


export default function Cart() {
  const { cart, deleteProduct, clear } = useCart()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState(false)
  const { isAuthenticated } = useRoles()

  const handleSubmit = (formData, values) => {
    if(cart.length > 0) {
      setIsLoading(true)
      const newFormData = formData
      const orderItems = cart.map((prod) => {
        return {
          meat_product_id: prod.id,
          amount: prod.amount
        }
      })
      newFormData.order_items = orderItems
      createStandardOrder(newFormData)
        .then(() => {
          clear()
          values.delivery_type = ''
          values.address = ''
          values.payment_method = ''
          toast.success('Se ha realizado la orden correctamente.')
        })
        .catch((e) => {
          console.error(e);
          setIsError(e)
          toast.error('Upss. Ha ocurrido un error al realizar la orden.')
        })
        .finally(() => setIsLoading(false))
    }

  }
  
  if(!isAuthenticated) return null
  return (
    <div>
      <MeatMenu/>

      <div className="py-8 px-1 sm:px-4 md:p-8">

        <h1 className="text-center text-3xl font-bold">
          Carrito de Compras
        </h1>

        { isError && <h1>Revento esta talla</h1> }

        <div className="flex flex-col md:flex-row p-4 gap-8 justify-center">
          <section className="xl:w-1/5 md:w-1/3 lg:w-1/4 w-full">
            <OrderForm handleSubmit={handleSubmit}/>
          </section>

          <section className="xl:w-4/5 md:w-2/3 lg:w-3/4 flex flex-col gap-y-10">
            <CartList 
              cart={cart} 
              deleteProduct={deleteProduct}
            />
            {
              cart.length > 0
                && <Button 
                    color="success" 
                    variant="solid" 
                    className="self-end"
                    form="form-order"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Realizar Pedido
                  </Button>
            }

          </section>


        </div>

      </div>
    </div>
  )
}