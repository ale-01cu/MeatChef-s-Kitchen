import OrderForm from "../components/Order/OrderForm"
import CartList from "../components/Cart/CartList"
import { Button } from "@nextui-org/react"
import MeatMenu from "../components/MeatMenu"

export default function Cart() {
  return (
    <div>
      <MeatMenu/>

      <div className="py-8 px-1 sm:px-4 md:p-8">

        <h1 className="text-center text-3xl font-bold">
          Carrito de Compras
        </h1>

        <div className="flex flex-col md:flex-row p-4 gap-8 justify-center">
          <section className="xl:w-1/5 md:w-1/3 lg:w-1/4 w-full">
            <OrderForm/>
          </section>

          <section className="xl:w-4/5 md:w-2/3 lg:w-3/4 flex flex-col gap-y-10">
            <CartList/>
            <Button color="success" variant="solid" className="self-end">Ordenar</Button>
          </section>


        </div>

      </div>
    </div>
  )
}