import InputFile from "../InputFile";
import { Image } from "@nextui-org/react";
import { BASE_URL } from "../../utils/constants";
import { useCallback, useEffect, useState } from "react";
import {  
  Textarea,
  Input,
  Checkbox,
  Button
} from "@nextui-org/react";
import { updateMeat, retrieveMeats } from '../../services/meats'
import CategoriesSelect from "../Category/CategoriesSelect";
import useListCategories from "../../hooks/useListCategories";

export default function UpdateMeatForm(props) {
  const { meatId, closeModal, refreshOneElement } = props
  const [ meatData, setMeatData ] = useState(null)
  const [ photoFile, setPhotoFile ] = useState()
  const [ updateIsError, setUpdateIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const { categories } = useListCategories()

  useEffect(() => {
    retrieveMeats(meatId)
      .then(data => setMeatData(data))
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
  }, [meatId])


  const handleChange = useCallback((e, field) => {
    const value = e.target.value
    let newMeatData = {
      ...meatData
    }
    newMeatData[field] = value 
    setMeatData(newMeatData)
  }, [])

  const photoHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }, [])

  const handleSelect = useCallback(() => {
    setMeatData({
      ...meatData,
      is_active: !meatData.is_active
    })
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', meatData.is_active)

    updateMeat(meatId, formData)
      .then(() => {
        closeModal()
        refreshOneElement(meatId)
      })
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
      .finally(() => setIsLoading(false))
  }, [])


  if(!meatData) return null

  return (
    <>
      {
        updateIsError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="form-update-meat" 
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

        <CategoriesSelect 
          placeholder='Seleccione una Categoria'
          categories={categories}
          isLoading={false}
          defaultValue={meatData?.category?.id}
          location='FORM'
        />

        <Textarea
          name="description"
          placeholder="Descripcion del curso"
          type="text"
          onChange={(e) => handleChange(e, 'description')}
          value={meatData.description}
        />

        {
          photoFile 
            ? <div>
                <InputFile 
                  name='photo'
                  fileAccept='image/jpeg, image/png' 
                  text='Cambiar Foto'
                  handleChange={photoHandleChange}
                />

                <Image 
                  className="w-full max-h-[400px]" 
                  src={URL.createObjectURL(photoFile)} 
                  alt="" 
                />
              </div>
            : <div>
                <InputFile 
                  name='photo'
                  fileAccept='image/jpeg, image/png' 
                  text='Cambiar Foto'
                  handleChange={photoHandleChange}
                />

                <Image 
                  className="w-full max-h-[400px]" 
                  src={BASE_URL + '/' + meatData.photo} 
                  alt="" 
                />
              </div>
        }


        <Checkbox 
          defaultSelected 
          name="is_active" 
          isSelected={meatData.is_active} 
          onValueChange={handleSelect}
        >
          Activo
        </Checkbox>

        <Button 
          className='mt-4' 
          type='submit' 
          isLoading={isLoading}
          color="primary"
        >
            Actualizar
        </Button>
      </form>
    </>
  )
}