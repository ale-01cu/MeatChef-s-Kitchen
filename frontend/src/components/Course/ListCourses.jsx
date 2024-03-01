import Card from '../Card.jsx'
import { useEffect, useState } from 'react'
import { deleteCourse } from '../../services/courses.js'
import CardMenu from '../CardMenu.jsx'
import CustomModal from '../CustomModal.jsx'
import UpdateCourseForm from './UpdateCourseForm.jsx.jsx'

export default function ListCourses(props) {
  const { data, user, refreshParent, refreshOneElement } = props
  const [ isTeacher, setIsTeacher ] = useState(false)
  const [ deleteIsError, setDeleteIsError ] = useState(null)
  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)


  useEffect(() => {
    if(user) setIsTeacher(user.is_teacher)
  }, [user])

  const handleclick = (course_id, onClose) => {
    setIsLoadingDelete(true)
    deleteCourse(course_id)
      .then(() => {
        onClose()
        refreshParent(prev => prev+=1)
      })
      .catch(e => {
        console.error(e)
        setDeleteIsError(e)
      })
      .finally(() => setIsLoadingDelete(false))
  }

  return (
    <>
      <ul>
        {
          data?.map(course => (
            <li key={course.id}>
              <Card 
                image={course.photo}
                name={course.name}
                description={course.description}
                path='#'
              />
              {
                isTeacher &&
                  <div>
                    {
                      course.is_active 
                        ? <span>Activo</span>
                        : <span>Inactivo</span>
                    }

                    <CardMenu
                      itemId={course.id}
                      courseIsActive={course.is_active}
                      handleclickDelete={handleclick}
                      textModalDelete='Desea eliminar el curso seleccionado ?'
                      deleteIsError={deleteIsError}
                      isLoadingDelete={isLoadingDelete}
                    >
                      <CustomModal
                        btnText='Editar' 
                        headerText='Editar Curso'
                      >

                        <UpdateCourseForm 
                          courseId={course.id}
                          refreshOneElement={refreshOneElement}
                        />
                        
                      </CustomModal>
                    </CardMenu>

                  </div>
              }
            </li>
          ))
        }
      </ul>
    
    </>
  )
}