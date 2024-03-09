import {  
  Input,
  Button
} from "@nextui-org/react";
import { useState } from "react";
import { createCategories } from "../../services/categories";
import { useFormik } from 'formik'
import { categorySchema } from "../../validations/category";

export default function CategoryForm ({ closeModal, setCategories }) {
  const [ isError, setIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const formik = useFormik({
    initialValues: categorySchema.initialValues,
    validationSchema: categorySchema.validationSchema,
    onSubmit: async (formData) => {
      setIsLoading(true)
      createCategories(JSON.stringify(formData))
        .then((data) => {
          setCategories(prev => {
            return [
              ...prev,
              data
            ]
          })
          closeModal()
        })
        .catch((e) => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
    }
  })


  return (
    <>
      {
        isError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="create-category-form" 
        className="flex flex-col gap-y-2" 
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Nombre"
          name="name"
          placeholder="Nombre de la Categoria"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.errors.name ? true : false}
          errorMessage={formik.errors.name}
          
        />

        <Button 
          className='mt-5' 
          type='submit' 
          isLoading={isLoading}
          color="primary"
        >
            Guardar
        </Button>
      </form>
    </>
  )
}