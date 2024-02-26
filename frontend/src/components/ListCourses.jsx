import Card from './Card'
import { useEffect, useState } from 'react'
import { deleteCourse } from '../services/courses'
import { Link } from 'wouter'
import CourseFormModal from './CourseFormModal'
import CardMenu from './CardMenu'

export default function ListCourses({data, user, refreshParent}) {
  const [ isTeacher, setIsTeacher ] = useState(false)


  useEffect(() => {
    if(user) setIsTeacher(user.is_teacher)
  }, [user])

  const handleclick = (course_id) => {
    deleteCourse(course_id)
      .then(() => refreshParent(prev => prev+=1))
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
                      course_id={course.id}
                      courseIsActive={course.is_active}
                      handleclickDelete={handleclick}
                    />

                  </div>
              }
            </li>
          ))
        }
      </ul>
    
    </>
  )
}