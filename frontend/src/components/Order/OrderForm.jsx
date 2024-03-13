import { RadioGroup, Radio, Textarea } from "@nextui-org/react"
import { Formik, useFormik } from "formik"
import * as Yup from 'yup'

const deliveryTypeOptions = [ 'recogida', 'envio' ]
const paymentMethodOptions = [ 'efectivo', 'targeta_magnetica' ]

export default function OrderForm({ handleSubmit }) {
  
  const formik = useFormik({
    initialValues: {
      delivery_type: '',
      address: '',
      payment_method: '',
    },
    validationSchema: Yup.object().shape({
      delivery_type: Yup
        .string('Este campo debe de ser un texto.')
        .oneOf(deliveryTypeOptions, 'Debe seleccionar una opción válida')
        .required(true, 'Este campo es obligatorio'),
      address: Yup
        .string('Este campo debe de ser un texto.'),
      payment_method: Yup
        .string('Este campo debe de ser un texto.')
        .oneOf(paymentMethodOptions, 'Debe seleccionar una opción válida')
        .required(true, 'Este campo es obligatorio')
    }),
    onSubmit: (formDaTA) => handleSubmit(formDaTA, formik.values)
  })

  return (
    <form id="form-order" onSubmit={formik.handleSubmit}>
      <div className="flex md:flex-col justify-center gap-x-2 gap-y-2">
        <div className="p-8 flex flex-col gap-y-5 bg-white rounded-xl">
          <RadioGroup 
            name="delivery_type"
            label="Tipo de Entrega" 
            value={formik.values.delivery_type}
            onChange={formik.handleChange}
            classNames={{
              label: 'text-black text-xl font-semibold'
            }}
          >
            <Radio 
              value="recogida" 
              classNames={{
                label: 'text-black'
              }}
            >
              Recogida en Tienda
            </Radio>
            <Radio 
              value="envio" 
              classNames={{
                label: 'text-black'
              }}
            >
              Envio
            </Radio>
          </RadioGroup>

          <Textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            isRequired
            label="Dirección"
            labelPlacement="outside"
            placeholder="Escriba su dirección"
            className="max-w-xs"
            maxRows={3}
            variant="bordered"
            isDisabled={formik.values.delivery_type === 'envio' ? false : true}
            classNames={{
              label: 'group-data-[filled-within=true]:text-black',
              input: 'text-black'
            }}
          />

        </div>

        <div className="p-8 flex flex-col gap-y-5 bg-white rounded-xl">
          <RadioGroup 
            name="payment_method"
            value={formik.values.payment_method}
            onChange={formik.handleChange}
            label="Metodo de Pago"
            classNames={{
              label: 'text-black text-xl font-semibold'
            }}
          >
            <Radio 
              value="efectivo"
              classNames={{
                label: 'text-black'
              }}
            >
                Efectivo
              </Radio>
            <Radio 
              value="targeta_magnetica"
              classNames={{
                label: 'text-black'
              }}
            >
              Targeta de Crédito
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </form>
  )
}