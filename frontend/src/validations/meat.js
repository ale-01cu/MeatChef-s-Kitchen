import * as Yup from 'yup'

const meatValidation = {
  initialValues: {
    type_of_meat: '',
    name_of_the_cut_of_meat: '',
    price: 0,
    category_id: '',
    description: '',
    photo: '',
    isActive: true
  },
  validationSchema: Yup.object({
    type_of_meat: Yup
      .string('El campo debe de ser un texto.')
      .min(3, 'El minimo de caracteres es 3.')
      .max(30, 'El maximo de caracteres es 30.')
      .required(true, 'El campo es obligatorio.'),
    name_of_the_cut_of_meat: Yup
      .string('La campo debe ser de tipo texto.')
      .min(3, 'El minimo de caracteres es 3.')
      .max(30, 'El maximo de caracteres es 30.')
      .required(true, 'El campo es obligatorio.'),
    price: Yup
      .number('La campo debe de ser un numero.')
      .min(0, 'El minimo es 0.')
      .required(true, 'El campo es obligatorio.'),
    category_id: Yup
      .string('La campo debe de ser un texto.')
      .required(true, 'El campo es obligatorio.'),
    description: Yup
      .string('La campo debe de ser un texto.')
      .min(10, 'El minimo es 10.')
      .max(120, 'El maximo de caracteres es 120.')
      .required(true, 'El campo es obligatorio.'),
    isActive: Yup
      .boolean('El campo debe de ser un boleano.'),
  })
}

export default meatValidation