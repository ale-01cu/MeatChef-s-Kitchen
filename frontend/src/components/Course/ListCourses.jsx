import Card from '../Card.jsx'
import { useEffect, useState } from 'react'
import { deleteCourse } from '../../services/courses.js'
import CardMenu from '../CardMenu.jsx'
import CustomModal from '../CustomModal.jsx'
import UpdateCourseForm from './UpdateCourseForm.jsx.jsx'
import { Button } from '@nextui-org/react'
import EditIcon from '../EditIcon.jsx'
import ActiveIcon from '../ActiveIcon.jsx'
import CloseIcon from '../CloseIcon.jsx'
import CardChipStatus from '../CardChipStatus.jsx'
import { COURSES_URL } from '../../utils/constants.js'

export default function ListCourses(props) {
  const { data, user, refreshParent, refreshOneElement } = props
  const [ isTeacher, setIsTeacher ] = useState(false)
  const [ deleteIsError, setDeleteIsError ] = useState(null)
  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)


  useEffect(() => {
    if(user) setIsTeacher(user?.is_teacher || user?.is_superuser)
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
    <section className='py-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
      <ul>
        {
          data?.map(course => (
            <li key={course.id} className='relative flex justify-end'>
              <Card 
                image={course.photo}
                name={course.name}
                description={course.description}
                path={'/cursos/' + course.id}
              />
              {
                isTeacher &&
                  <div className='absolute z-10 flex justify-between w-full'>
                    {
                      course.is_active 
                        ? <CardChipStatus startContentIcon={<ActiveIcon/>} text='Activo' color='success'/>
                        : <CardChipStatus startContentIcon={<CloseIcon/>} text='Desactivado' color='danger'/>
                    }

                    <div className='flex flex-col gap-2'>
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
                          btnOpen={<Button className='px-0 min-w-unit-10' color='warning' startContent={<EditIcon/>}/>}

                        >

                          <UpdateCourseForm 
                            courseId={course.id}
                            refreshOneElement={refreshOneElement}
                          />
                          
                        </CustomModal>
                      </CardMenu>

                    </div>

                  </div>
              }
            </li>
          ))
        }
      </ul>
    
    </section>
  )
}