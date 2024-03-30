import {  
  Textarea,
  Input,
  Checkbox,
  Image,
  Button
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import InputFile from "../Inputs/InputFile";
import { createMeat } from '../../services/meats'
import CategoriesSelect from "../Category/CategoriesSelect";
import useListCategories from "../../hooks/useListCategories";
import meatValidation from "../../validations/meat";
import { useFormik } from 'formik'
import PhotoIcon from "../Icons/PhotoIcon";
import { useMemo } from "react";

export default function AddMeatForm ({ closeModal, refreshParent }) {
  const [ photoFile, setPhotoFile ] = useState()
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const { categories } = useListCategories()

  const formik = useFormik({
    initialValues: meatValidation.initialValues,
    validationSchema: meatValidation.validationSchema
  })

  const photoHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }, [])

  const clearStates = useCallback(() => {
    formik.values.type_of_meat = ''
    formik.values.name_of_the_cut_of_meat = ''
    formik.values.price = 0
    formik.values.category_id = ''
    formik.values.description = ''
    formik.values.isActive = true
    setPhotoFile(null)
  }, [formik.values])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', formik.values.isActive)

    createMeat(formData)
      .then(() => {
          clearStates()
          closeModal()
          if(refreshParent)
            refreshParent(prev => prev+=1)
      })
      .catch(e => {
        console.error(e);
        setAddIsError(e)
      })
      .finally(() => setIsLoading(false))

  }, [clearStates, closeModal, formik.values.isActive, refreshParent])


  const photoMemo = useMemo(() => (
    photoFile && <div>
      <Image 
        className="w-full max-h-[400px]" 
        src={URL.createObjectURL(photoFile)} 
        alt="" 
      />
    </div>
  ), [photoFile])

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
          onChange={formik.handleChange}
          value={formik.values.type_of_meat}
          isInvalid={formik.errors.type_of_meat ? true : false}
          errorMessage={formik.errors.type_of_meat}
        />

        <Input
          label="Nombre del Corte"
          name="name_of_the_cut_of_meat"
          placeholder="Nombre del Corte"
          onChange={formik.handleChange}
          value={formik.values.name_of_the_cut_of_meat}
        />

        <Input
          label="Precio"
          name="price"
          type="number"
          placeholder="Precio"
          onChange={formik.handleChange}
          value={formik.values.price}
        />

        <CategoriesSelect 
          placeholder='Seleccione una Categoria'
          categories={categories}
          isLoading={false}
          defaultValue={'NONE'}
          location='FORM'
        />

        <Textarea
          label='Descripcion'
          name="description"
          placeholder="Descripcion del Corte"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

        <InputFile 
          name='photo'
          fileAccept='image/jpeg, image/png' 
          text='Cambiar Foto'
          handleChange={photoHandleChange}
          startContentIcon={<PhotoIcon/>}
          spanClassName='flex justify-center items-center gap-x-2 p-2'

        />

        { photoMemo }

        <Checkbox 
          defaultSelected 
          name="isActive" 
          isSelected={formik.values.isActive} 
          onValueChange={formik.handleChange}
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