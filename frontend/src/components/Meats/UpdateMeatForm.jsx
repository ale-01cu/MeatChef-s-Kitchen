import InputFile from "../Inputs/InputFile";
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
import PhotoIcon from "../Icons/PhotoIcon";
import meatValidation from "../../validations/meat";
import * as Yup from 'yup'
import GeneralError from "../Errors/GeneralError";

export default function UpdateMeatForm(props) {
  const { meatId, closeModal, refreshOneElement } = props
  const [ meatData, setMeatData ] = useState(null)
  const [ photoFile, setPhotoFile ] = useState()
  const [ updateIsError, setUpdateIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const { categories } = useListCategories()
  const [ formErrors, setFormErrors ] = useState({
    type_of_meat: '',
    name_of_the_cut_of_meat: '',
    price: '',
    category_id: '',
    description: '',
    isActive: '',
    photo: '',
  })
  
  useEffect(() => {
    retrieveMeats(meatId)
      .then(data => setMeatData(data))
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
  }, [meatId])


  const handleChange = useCallback(async (e, field) => {
    try {
      const value = e.target.value
      setMeatData({ ...meatData, [field]: value })
      const fieldSchema = Yup.reach(meatValidation.validationSchema, field);
      await fieldSchema.validate(value, { abortEarly: false });
      
    } catch (error) {
      console.error(error);
      // Maneja los errores de validación aquí
      if(error.name === 'ValidationError') {
        const errorMessages = {error}.error.inner.reduce((acc, e) => {
          acc[field] = e.message;
          return acc;
        }, {})
        setFormErrors(prev => ({...prev, ...errorMessages}))
      }
    }
  }, [meatData])

  const photoHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }, [])

  const handleSelect = useCallback(() => {
    setMeatData({
      ...meatData,
      is_active: !meatData.is_active
    })
  }, [meatData])

  const handleSubmit = useCallback(async (e) => {
    
    try {
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(e.target)
      formData.set('is_active', meatData.is_active)
      await meatValidation.validationSchema.validate(
        Object.fromEntries(formData.entries()), 
        { abortEarly: false }
      )
      await updateMeat(meatId, formData)
      closeModal()
      refreshOneElement(meatId)

    } catch (errors) {
      console.error(errors);
      // Maneja los errores de validación aquí
      if(errors.name === 'ValidationError') {
        const errorMessages = {errors}.errors.inner.reduce((acc, e) => {
          const field = e.path;
          acc[field] = e.message;
          return acc;
        }, {})
        setFormErrors(errorMessages)

      }else {
        setUpdateIsError(e)
      }
    
    } finally {

      setIsLoading(false);
    
    }
  }, [closeModal, meatData, refreshOneElement, meatId])


  if(!meatData) return null
  return (
    <>
      {
        updateIsError &&
          <GeneralError/>
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
          isInvalid={formErrors.type_of_meat ? true : false}
          errorMessage={formErrors.type_of_meat}
        />

        <Input
          label="Nombre del Corte"
          name="name_of_the_cut_of_meat"
          placeholder="Nombre del Corte"
          onChange={(e) => handleChange(e, 'name_of_the_cut_of_meat')}
          value={meatData.name_of_the_cut_of_meat}
          isInvalid={formErrors.name_of_the_cut_of_meat ? true : false}
          errorMessage={formErrors.name_of_the_cut_of_meat}
        />

        <Input
          label="Precio"
          name="price"
          type="number"
          placeholder="Precio"
          onChange={(e) => handleChange(e, 'price')}
          value={meatData.price}
          isInvalid={formErrors.price ? true : false}
          errorMessage={formErrors.price}
        />

        <CategoriesSelect 
          placeholder='Seleccione una Categoria'
          categories={categories}
          isLoading={false}
          defaultValue={meatData?.category?.id}
          onChange={(e) => handleChange(e, 'category_id')}
          value={meatData?.category_id}
          isInvalid={formErrors.category_id ? true : false}
          errorMessage={formErrors.category_id}
        />

        <Textarea
          name="description"
          placeholder="Descripcion del curso"
          type="text"
          onChange={(e) => handleChange(e, 'description')}
          value={meatData.description}
          isInvalid={formErrors.description ? true : false}
          errorMessage={formErrors.description}
        />

        <InputFile 
          name='photo'
          fileAccept='image/jpeg, image/png' 
          text='Cambiar Foto'
          handleChange={photoHandleChange}
          startContentIcon={<PhotoIcon/>}
          className='w-full'
          spanClassName='flex justify-center items-center gap-x-2 p-2'
        />

        <Image 
          className="w-full max-h-[400px]" 
          src={photoFile ? URL.createObjectURL(photoFile) : BASE_URL + '/' + meatData.photo} 
          alt="" 
        />


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