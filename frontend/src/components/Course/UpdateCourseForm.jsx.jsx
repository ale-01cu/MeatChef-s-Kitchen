import InputFile from "../InputFile";
import { Image } from "@nextui-org/react";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { retrieveCourses, updateCourse } from "../../services/courses";
import {  
  Textarea,
  Input,
  Checkbox,
  Button
} from "@nextui-org/react";

export default function UpdateCourseForm(props) {
  const {courseId, closeModal, refreshOneElement } = props
  const [ courseData, setCoursesData ] = useState(null)
  const [ photoFile, setPhotoFile ] = useState()
  const [ videoFile, setVideoFile ] = useState()
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


  const handleChange = (e, field) => {
    const value = e.target.value
    let newCourseData = {
      ...courseData
    }
    newCourseData[field] = value 
    setCoursesData(newCourseData)
  }

  const photoHandleChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
  }

  const videoHandleChange = (e) => {
    const file = e.target.files[0]
    setVideoFile(file)
  }

  const handleSelect = () => {
    setCoursesData({
      ...courseData,
      is_active: !courseData.is_active
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', courseData.is_active)

    updateCourse(courseId, formData)
      .then(({res}) => {
        if(res.ok) {
          closeModal()
          refreshOneElement(courseId)
        }
      })
      .catch(e => {
        console.error(e);
        setUpdateIsError(e)
      })
      .finally(() => setIsLoading(false))
  }


  if(!courseData) return null

  return (
    <>
      {
        updateIsError &&
          <h1>Revento esta talla</h1>
      }
      <form 
        id="form-login" 
        className="" 
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
                  src={BASE_URL + '/' + courseData.photo} 
                  alt="" 
                />
              </div>
        }

        {
          videoFile 
            ? <div>
                <InputFile 
                  name='video'
                  fileAccept='video/mp4' 
                  text='Cambiar Video'
                  handleChange={videoHandleChange}
                />

                <video controls>
                  <source 
                    src={URL.createObjectURL(videoFile)}
                    type="video/mp4"
                  />
                  Tu navegador no soporta la etiqueta video.

                </video>
              </div>
            : <div>
                <InputFile 
                  name='video'
                  fileAccept='video/mp4' 
                  text='Cambiar Video'
                  handleChange={videoHandleChange}
                />

                <video controls>
                  <source 
                    src={BASE_URL + '/' + courseData.video} 
                    type="video/mp4"
                  />
                  Tu navegador no soporta la etiqueta video.
                </video>
              </div>
        }

        <Checkbox 
          defaultSelected 
          name="is_active" 
          isSelected={courseData.is_active} 
          onValueChange={handleSelect}
        >
          Activo
        </Checkbox>

        <Button 
          className='' 
          type='submit' 
          isLoading={isLoading}
        >
            Actualizar
        </Button>
      </form>
    </>
  )
}