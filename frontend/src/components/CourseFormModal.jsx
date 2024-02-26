import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Textarea,
  Input
} from "@nextui-org/react";
import InputFile from "./InputFile";
import { Image } from "@nextui-org/react";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { retrieveCourses, updateCourse } from "../services/courses";

export default function CourseFormModal({course_id, refreshParent}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ courseData, setCoursesData ] = useState()
  const [ photoFile, setPhotoFile ] = useState()
  const [ videoFile, setVideoFile ] = useState()

  useEffect(() => {
    retrieveCourses(course_id)
      .then(data => setCoursesData(data))
  }, [course_id])


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

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    updateCourse(course_id, formData)
      .then(({res}) => {
        if(res.ok) {
          onClose()
          refreshParent(prev => prev+=1)
        }
      })
  }


  return (
    <>
      <button onClick={onOpen}>Editar</button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          scrollBehavior='inside'
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="">Editar Curso</ModalHeader>
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