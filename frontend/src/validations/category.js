import * as Yup from 'yup'

export const categorySchema = {
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string('El nombre debe de ser un texto.')
        .min(3, 'Nombre muy pequeño.')
        .max(20, "El nombre es muy grande.")
        .required('El nombre es obligatorio.'), 
    }),
  }