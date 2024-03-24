import * as Yup from 'yup'

export const courseValidation = {
    initialValues: {
      name: '',
      description: '',
      isActive: true

    },
    validationSchema: Yup.object({
      name: Yup
        .string('El nombre debe de ser un texto.')
        .min(3, 'Nombre muy pequeño.')
        .max(50, "El nombre es muy grande.")
        .required('El nombre es obligatorio.'), 
      description: Yup
        .string('La descripcion debe de ser un texto.')
        .min(20, 'Descripcion muy pequeña.')
        .max(160, "La Descripcion es muy grande.")
        .required('La Descripcion es obligatoria.'), 
      isActive: Yup 
        .boolean('El campo debe de ser un booleano.')
    }),
  }