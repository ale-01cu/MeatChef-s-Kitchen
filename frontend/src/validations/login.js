import * as Yup from 'yup'

const loginValidation = {
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    email: Yup
      .string('El email debe de ser un texto.')
      .email("El email no es valido.")
      .required('El password es obligatorio.'),
    password: Yup
      .string('La contraseña debe ser de tipo texto.')
      .required('El password es obligatorio.')
  })
}

export default loginValidation