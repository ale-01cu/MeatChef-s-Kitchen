import * as Yup from 'yup'

const userValidation = {
  initialValues: {
    email: '',
    full_name: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    is_active: true,
    is_superuser: false,
    is_staff: false,
    is_teacher: false
  },

  validationSchema: Yup.object({
    full_name: Yup
      .string('El nombre debe de ser un texto.')
      .required('El nombre es obligatorio.'), 
    phone_number: Yup
      .string('El numero telefonico debe de ser un texto')
      .matches(/^[a-zA-Z0-9-]*$/, "El numero telefonico no puede tener espacio.")
      .required('El numero telefonico es obligatorio.'),
    email: Yup
      .string('El email debe de ser un texto')
      .email("El email no es valido")
      .required("El email es obligatorio."),
    password: Yup
      .string('El contraseña debe de ser un texto')
      .required("El contraseña es obligatorio.")
      .min(6, 'El contraseña debe de tener como minimo 6 caracteres.')
      .max(25, 'La contraseña debe de ser de almenos 25 caracteres')
      .oneOf([Yup.ref("repeatPassword")], "Los contraseña no coinciden."),
    repeatPassword: Yup
      .string('El confirmar contraseña debe de ser un texto')
      .required("El contraseña es obligatorio.")
      .min(6, 'El confirmar contraseña debe de tener como minimo 6 caracteres.')
      .max(25, 'La contraseña debe de ser de almenos 25 caracteres')
      .oneOf([Yup.ref("password")], "Los passwords no coinciden."),
    is_active: Yup
        .boolean('El campo debe de ser marcable.'),
    is_superuser: Yup
        .boolean('El campo debe de ser marcable.'),
    is_staff: Yup
        .boolean('El campo debe de ser marcable.'),
    is_teacher: Yup
        .boolean('El campo debe de ser marcable.'),
  })
}

export default userValidation