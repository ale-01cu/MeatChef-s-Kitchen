import {  
  Textarea,
  Input,
  Checkbox,
  Image,
  Button
} from "@nextui-org/react";
import { useState } from "react";
import InputFile from "../InputFile";
import { createMeat } from '../../services/meats'
import CategoriesSelect from "../CategoriesSelect";

export default function AddMeatForm ({ closeModal, refreshParent }) {
  const [ meatData, setMeatData ] = useState({
    type_of_meat: '',
    name_of_the_cut_of_meat: '',
    price: 0,
    category_id: '',
    description: '',
  })
  const [ photoFile, setPhotoFile ] = useState()
  const [ isSelected, setIsSelected ] = useState(true);
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)


  const handleChange = (e, field) => {
    const value = e.target.value
    let newMeatData = {
      ...meatData
    }
    newMeatData[field] = value 
    setMeatData(newMeatData)
  }

  const photoHandleChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }

  const clearStates = () => {
    setMeatData({
      type_of_meat: '',
      name_of_the_cut_of_meat: '',
      price: 0,
      category_id: '',
      description: '',
    })
    setPhotoFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', isSelected)
    createMeat(formData)
      .then(() => {
          clearStates()
          closeModal()
          refreshParent(prev => prev+=1)
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
        id="create-meat" 
        className="flex flex-col gap-y-2" 
        onSubmit={handleSubmit}
      >
        <Input
          label="Tipo de Carne"
          name="type_of_meat"
          placeholder="Tipo de Carne"
          onChange={(e) => handleChange(e, 'type_of_meat')}
          value={meatData.type_of_meat}
        />

        <Input
          label="Nombre del Corte"
          name="name_of_the_cut_of_meat"
          placeholder="Nombre del Corte"
          onChange={(e) => handleChange(e, 'name_of_the_cut_of_meat')}
          value={meatData.name_of_the_cut_of_meat}
        />

        <Input
          label="Precio"
          name="price"
          type="number"
          placeholder="Precio"
          onChange={(e) => handleChange(e, 'price')}
          value={meatData.price}
        />

        <CategoriesSelect placeholder='Seleccione una Categoria'/>

        <Textarea
          label='Descripcion'
          name="description"
          placeholder="Descripcion del Corte"
          type="text"
          onChange={(e) => handleChange(e, 'description')}
          value={meatData.description}
        />

        <InputFile 
          name='photo'
          fileAccept='image/jpeg, image/png' 
          text='Cambiar Foto'
          handleChange={photoHandleChange}
        />

        {
          photoFile && <div>
            <Image 
              className="w-full max-h-[400px]" 
              src={URL.createObjectURL(photoFile)} 
              alt="" 
            />
          </div>
        }

        <Checkbox 
          defaultSelected 
          name="is_active" 
          isSelected={isSelected} 
          onValueChange={setIsSelected}
        >
          Activo
        </Checkbox>

        <Button 
          className='mt-5' 
          type='submit'
          color="primary" 
          isLoading={isLoading}
        >
            Guardar
        </Button>
      </form>
    </>
  )
}