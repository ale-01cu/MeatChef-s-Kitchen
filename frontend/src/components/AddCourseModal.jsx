import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Textarea,
  Input,
  Checkbox
} from "@nextui-org/react";
import InputFile from "./InputFile";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import { createCourse } from "../services/courses";

export default function CourseFormModal({refreshParent}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ courseData, setCoursesData ] = useState({
    name: '',
    description: '',
  })
  const [ photoFile, setPhotoFile ] = useState()
  const [ videoFile, setVideoFile ] = useState()
  const [isSelected, setIsSelected] = useState(true);


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

    const formData = new FormData(e.target)
    formData.set('is_active', isSelected)
    createCourse(formData)
      .then(({res, data}) => {
        console.log(data);
        if(res.ok) {
          clearStates()
          onClose()
          refreshParent(prev => prev+=1)
        }
      })
  }


  return (
    <>
      <button onClick={onOpen}>Agregar Nuevo Curso</button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          scrollBehavior='inside'
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="">Crear Curso</ModalHeader>
                <ModalBody>
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

                    <InputFile 
                      name='video'
                      fileAccept='video/mp4' 
                      text='Cambiar Video'
                      handleChange={videoHandleChange}
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

                    <Checkbox 
                      defaultSelected 
                      name="is_active" 
                      isSelected={isSelected} 
                      onValueChange={setIsSelected}
                    >
                      Activo
                    </Checkbox>

                    <button 
                      className='' 
                      type='submit' 
                    >
                        Guardar
                    </button>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}