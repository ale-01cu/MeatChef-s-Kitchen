import * as Yup from 'yup'

const deliveryTypeOptions = [ 'recogida', 'envio' ]
const paymentMethodOptions = [ 'efectivo', 'targeta_magnetica' ]

const orderValidation = {
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
  })
}

export default orderValidation