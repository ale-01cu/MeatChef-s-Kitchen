import CategoryList from "../components/Category/CategoryList"
import useListCategories from "../hooks/useListCategories"
import OrderForm from "../components/Order/OrderForm"
import CartList from "../components/Cart/CartList"
import { Button } from "@nextui-org/react"

export default function Cart() {
  const { categories } = useListCategories()

  return (
    <div>
      <CategoryList categories={categories}/>

      <div className="py-8 px-1 sm:px-4 md:p-8">

        <h1 className="text-center text-3xl font-bold">
          Carrito de Compras
        </h1>

        <div className="flex flex-col-reverse sm:flex-row p-4 gap-8">
          <section className="xl:w-1/5 sm:w-1/3 lg:w-1/4 border-t border-stone-300 py-8 sm:py-0 border-dashed sm:border-none">
            <OrderForm/>
          </section>

          <section className="xl:w-4/5 sm:w-2/3 lg:w-3/4 flex flex-col gap-y-10">
            <CartList/>
            <Button color="success" variant="solid" className="self-end">Ordenar</Button>
          </section>

        </div>

      </div>
    </div>
  )
}