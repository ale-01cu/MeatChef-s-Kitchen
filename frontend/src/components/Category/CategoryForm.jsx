import {  
  Input,
  Button
} from "@nextui-org/react";
import { useState } from "react";
import { createCategories } from "../../services/categories";

export default function CategoryForm ({ closeModal }) {
  const [ name, setName ] = useState('')
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const clearStates = () => {
    setName('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)

    createCategories(formData)
      .then(() => {
          clearStates()
          closeModal()
      })
      .catch(e => {
        console.error(e);
        setAddIsError(e)
      })
      .finally(() => setIsLoading(false))

  }


  return (
    <>
      {
        addIsError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="create-category-form" 
        className="flex flex-col gap-y-2" 
        onSubmit={handleSubmit}
      >
        <Input
          label="Nombre"
          name="name"
          placeholder="Nombre de la Categoria"
          onChange={handleChange}
          value={name}
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