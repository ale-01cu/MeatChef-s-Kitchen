import InputFile from "../Inputs/InputFile";
import { Image } from "@nextui-org/react";
import { BASE_URL } from "../../utils/constants";
import { useCallback, useEffect, useState } from "react";
import { retrieveCourses, updateCourse } from "../../services/courses";
import {  
  Textarea,
  Input,
  Checkbox,
  Button
} from "@nextui-org/react";
import PhotoIcon from "../Icons/PhotoIcon";
import VideoIcon from '../Icons/VideoIcon'

export default function UpdateCourseForm(props) {
  const {courseId, closeModal, refreshOneElement } = props
  const [ courseData, setCoursesData ] = useState(null)
  const [ photoFile, setPhotoFile ] = useState(null)
  const [ videoFile, setVideoFile ] = useState(null)
  const [ updateIsError, setUpdateIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)


  useEffect(() => {
    retrieveCourses(courseId)
      .then(data => setCoursesData(data))
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
  }, [courseId])


  const handleChange = useCallback((e, field) => {
    const value = e.target.value
    let newCourseData = {
      ...courseData
    }
    newCourseData[field] = value 
    setCoursesData(newCourseData)
  }, [courseData])

  const photoHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }, [])

  const videoHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setVideoFile(file)
  }, [])

  const handleSelect = useCallback(() => {
    setCoursesData({
      ...courseData,
      is_active: !courseData.is_active
    })
  }, [courseData])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', courseData.is_active)

    updateCourse(courseId, formData)
      .then(() => {
          closeModal()
          refreshOneElement(courseId)
      })
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
      .finally(() => setIsLoading(false))

  }, [closeModal, courseData?.is_active, courseId, refreshOneElement])


  if(!courseData) return null

  return (
    <>
      {
        updateIsError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="form-login" 
        className="flex flex-col gap-y-2" 
        onSubmit={handleSubmit}
      >
        <Input
          label="Nombre"
          name="name"
          placeholder="Nombre del Curso"
          onChange={(e) => handleChange(e, 'name')}
          value={courseData.name}
        />
        <Textarea
          name="description"
          placeholder="Descripcion del curso"
          type="text"
          onChange={(e) => handleChange(e, 'description')}
          value={courseData.description}
        />

        <div>
          <InputFile 
            name='photo'
            fileAccept='image/jpeg, image/png' 
            text='Cambiar Foto'
            className='w-full'
            handleChange={photoHandleChange}
            startContentIcon={<PhotoIcon/>}
            spanClassName='flex justify-center items-center gap-x-2 p-2'

          />

          <Image 
            className="w-full max-h-[400px]" 
            src={photoFile ? URL.createObjectURL(photoFile) : BASE_URL + '/' + courseData.photo} 
            alt="Foto del Curso" 
          />
        </div>

        <div>
          <InputFile 
            name='video'
            fileAccept='video/mp4' 
            text='Cambiar Video'
            className='w-full'
            handleChange={videoHandleChange}
            startContentIcon={<VideoIcon/>}
            spanClassName='flex justify-center items-center gap-x-2 p-2'

          />

          {
            videoFile 
              ? (
                <video controls>
                  <source 
                    src={URL.createObjectURL(videoFile)}
                    type="video/mp4"
                  />
                  Tu navegador no soporta la etiqueta video.

                </video>
              )
              : (
                <video controls>
                  <source 
                    src={BASE_URL + '/' + courseData.video}
                    type="video/mp4"
                  />
                  Tu navegador no soporta la etiqueta video.

                </video>
              )
          }
        </div>

        <Checkbox 
          defaultSelected 
          name="is_active" 
          isSelected={courseData.is_active} 
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