import OrderForm from "../components/Order/OrderForm"
import { Button } from "@nextui-org/react"
import { Textarea, Input } from "@nextui-org/react"
import MeatMenu from "../components/MeatMenu"

export default function CustomOrder() {

  return (
    <div>
      <MeatMenu/>

      <div className="py-8 px-1 sm:px-4 md:p-8">

        <h1 className="text-center text-3xl font-bold">
          Carrito de Compras
        </h1>

        <div className="flex flex-col md:flex-row p-4 gap-8">
          <section className="xl:w-1/5 md:w-1/3 lg:w-1/4">
            <OrderForm/>
          </section>

          <section className="w-full xl:w-4/5 md:w-2/3 lg:w-3/4 flex flex-col gap-y-10">
            <div className="h-full bg-white p-8 rounded-xl justify-between flex flex-col gap-y-2">
              <Textarea
                isRequired
                label="Descripcion del Pedido"
                labelPlacement="outside"
                placeholder="Escriba su descripcion"
                className=""
                variant="bordered"
                classNames={{
                  label: 'group-data-[filled-within=true]:text-black text-xl mb-2',
                  input: 'text-black min-h-[225px] max-h-[225px] w-full'
                }}
              />
              <div className="self-end">
                <Input
                  label="Cantidad"
                  name="amount"
                  type="number"
                  placeholder="Cantidad"
                  variant="bordered"
                  classNames={{
                    label: 'group-data-[filled-within=true]:text-black',
                    input: 'text-black'
                  }}
                />

              </div>
            </div>
            <Button color="success" variant="solid" className="self-end">
              Ordenar
            </Button>
          </section>

        </div>

      </div>
    </div>
  )
}