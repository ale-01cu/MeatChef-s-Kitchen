import OrderForm from "../components/Order/OrderForm"
import { Button } from "@nextui-org/react"
import { Textarea, Input } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { createCustomOrder } from '../services/customOrder'
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from 'yup'
import useRoles from "../hooks/useRoles"

export default function CustomOrder() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState(false)
  const { isAuthenticated } = useRoles()

  const formik = useFormik({
    initialValues: {
      description: '',
      amount: 1,
    },
    validationSchema: Yup.object().shape({
      description: Yup
        .string('Este campo debe de ser un texto.')
        .required(true, 'Este Campo es obligatorio.'),
      amount: Yup
        .number('Este campo debe de ser un numero.')
        .min(1, 'La cantidad minima de productos debe ser de 1.')
        .required(true, 'Este campo es obligatorio'),
    })
  })

  const handleSubmit = useCallback((formData, values) => {
    setIsLoading(true)
    const newFormData = formData
    newFormData.description = formik.values.description
    newFormData.amount = formik.values.amount

    createCustomOrder(newFormData)
      .then(() => {
        values.delivery_type = ''
        values.address = ''
        values.payment_method = ''
        formik.values.description = ''
        formik.values.amount = 1
        toast.success('Se ha realizado la orden personalizada correctamente.')
      })
      .catch((e) => {
        console.error(e);
        setIsError(e)
        toast.error('Upss. Ha ocurrido un error al realizar la orden personalizada.')
      })
      .finally(() => setIsLoading(false))
  }, [formik?.values])


  if(!isAuthenticated) return null
  return (
    <div>
      {/* <MeatMenu/> */}

      <div className="py-8 px-1 sm:px-4 md:p-8">

        <h1 className="text-center text-3xl font-bold">
          Carrito de Compras
        </h1>

        { isError && <h1>Revento esta talla</h1> }

        <div className="flex flex-col md:flex-row p-4 gap-8">
          <section className="xl:w-1/5 md:w-1/3 lg:w-1/4">
            <OrderForm handleSubmit={handleSubmit}/>
          </section>

          <section className="w-full xl:w-4/5 md:w-2/3 lg:w-3/4 flex flex-col gap-y-10">
            <div className="h-full bg-white p-8 rounded-xl justify-between flex flex-col gap-y-2">
              <Textarea
                isRequired
                name="description"
                label="Descripcion del Pedido"
                labelPlacement="outside"
                value={formik.values.description}
                onChange={formik.handleChange}
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
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  placeholder="Cantidad"
                  variant="bordered"
                  min={1}
                  classNames={{
                    label: 'group-data-[filled-within=true]:text-black',
                    input: 'text-black'
                  }}
                />

              </div>
            </div>
              <Button 
                color="success" 
                variant="solid" 
                className="self-end"
                form="form-order"
                type="submit"
                isLoading={isLoading}
              >
                Realizar Pedido
              </Button>
          </section>

        </div>

      </div>
    </div>
  )
}