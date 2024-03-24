import {  
  Textarea,
  Input,
  Checkbox,
  Image,
  Button
} from "@nextui-org/react";
import { useState } from "react";
import { createCourse } from "../../services/courses";
import InputFile from "../InputFile";
import PhotoIcon from "../Icons/PhotoIcon";
import VideoIcon from '../Icons/VideoIcon'
import { useFormik } from 'formik'
import { courseValidation } from "../../validations/course";

export default function AddCourseForm ({ closeModal, refreshParent }) {
  const [ photoFile, setPhotoFile ] = useState()
  const [ videoFile, setVideoFile ] = useState()
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const formik = useFormik({
    initialValues: courseValidation.initialValues,
    validationSchema: courseValidation.validationSchema,
  })

  const photoHandleChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }

  const videoHandleChange = (e) => {
    const file = e.target.files[0]
    setVideoFile(file)
  }

  const clearStates = () => {
    formik.values.name = ''
    formik.values.description = ''
    formik.values.isActive = true
    setPhotoFile(null)
    setVideoFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', formik.values.isActive)
    createCourse(formData)
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

  }


  return (
    <>
      {
        addIsError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="form-login" 
        className="flex flex-col gap-y-2 py-4" 
        onSubmit={handleSubmit}
      >
        <Input
          label="Nombre"
          name="name"
          placeholder="Nombre del Curso"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Textarea
          label='Descripcion'
          name="description"
          placeholder="Descripcion del curso"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

        <InputFile 
          name='photo'
          fileAccept='image/jpeg, image/png' 
          text='Foto'
          handleChange={photoHandleChange}
          startContentIcon={<PhotoIcon/>}
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

        <InputFile 
          name='video'
          fileAccept='video/mp4' 
          text='Video'
          handleChange={videoHandleChange}
          startContentIcon={<VideoIcon/>}
        />

        {

          videoFile && <div key={videoFile.name}>
            <video controls>
              <source 
                src={URL.createObjectURL(videoFile)}
                type="video/mp4"
              />
              Tu navegador no soporta la etiqueta video.

            </video>
          </div>

        }
        <div className="flex justify-end">
          <Checkbox 
            defaultSelected 
            name="isActive" 
            isSelected={formik.values.isActive} 
            onValueChange={formik.handleChange}
          >
            Activo
          </Checkbox>
        </div>

        <Button 
          className="mt-2"
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