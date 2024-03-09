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


export default function AddCourseForm ({ closeModal, refreshParent }) {
  const [ courseData, setCoursesData ] = useState({
    name: '',
    description: '',
  })
  const [ photoFile, setPhotoFile ] = useState()
  const [ videoFile, setVideoFile ] = useState()
  const [ isSelected, setIsSelected ] = useState(true);
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)


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

  const clearStates = () => {
    setCoursesData({
      name: '',
      description: '',
    })
    setPhotoFile(null)
    setVideoFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', isSelected)
    createCourse(formData)
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
        id="form-login" 
        className="flex flex-col gap-y-2 py-4" 
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
          label='Descripcion'
          name="description"
          placeholder="Descripcion del curso"
          type="text"
          onChange={(e) => handleChange(e, 'description')}
          value={courseData.description}
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
            name="is_active" 
            isSelected={isSelected} 
            onValueChange={setIsSelected}
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