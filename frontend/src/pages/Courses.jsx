import ListCourses from "../components/Course/ListCourses"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "wouter"
import { listSearchCourses, listCourses } from "../services/courses"
import useAuth from "../hooks/useAuth"
import { retrieveCourses } from "../services/courses"
import CourseMenu from "../components/Course/CourseMenu"
import CardMenuCourse from "../components/Card/CardMenuCourse"
import { deleteCourse } from "../services/courses"

export default function Courses() {
  const { search } = useParams()
  const { user } = useAuth()
  const [ coursesData, setCoursesData ] = useState([])
  const [ refreshComponent, setRefreshComponent ] = useState(0)
  const [ isError, setIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    if(search){
      listSearchCourses(search)
        .then(data => {
          setCoursesData(data)
        })
        .catch(e => {
          console.error(e)
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
    }else {
      listCourses()
        .then(data => {
          setCoursesData(data)
        })
        .catch(e => {
          console.error(e)
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
    }
  }, [search, refreshComponent])

  const reRenderOneElement = useCallback((courseId) => {
    retrieveCourses(courseId)
      .then((data) => {

        const newCourseData = coursesData.map((course) => {
          if(course.id === courseId) return data
          else return course
        })

        setCoursesData([
          ...newCourseData
        ])

      })
      .catch(e => console.error(e))
  }, [coursesData])

   const handleclickDelete = useCallback((courseId, onClose, setIsLoadingDelete, setDeleteIsError) => {
    setIsLoadingDelete(true)
    deleteCourse(courseId)
      .then(() => {
        onClose()
        setCoursesData(coursesData.map((course) => {
          if(course.id === courseId) course.is_active = false
          return course
        }))
      })
      .catch(e => {
        console.error(e)
        setDeleteIsError(e)
      })
      .finally(() => setIsLoadingDelete(false))
  }, [coursesData])


  if(isLoading) return <h1>Cargando</h1>
  if(isError) return <h1>Exploto esta talla</h1>
  return (
    <>
      <CourseMenu setRefreshComponent={setRefreshComponent}/>
      <div className="sm:p-10">
        {
          coursesData?.length > 0 &&
            <div>
              <h5 className="text-xl font-semibold text-center">
                Nuestros Cursos
              </h5>
            </div>
        }
        {
          !isError && search && <div>
            <h1 className="text-4xl font-extrabold text-center p-2">
              Resultados de la Busqueda
            </h1>
          </div>
        }
        
        {
          !isError && search && coursesData?.length === 0 
            &&  <div>
                  <h1 className="text-center text-pretty">
                    No se encontraron resultados :(
                  </h1>
                </div>
        }

        {
          !search && coursesData.length === 0 && !isError && !isLoading
            && <h1>No hay Cursos</h1>
        }

        {
          coursesData.length > 0 && !isError && !isLoading
            && <ListCourses 
                data={coursesData} 
                user={user}
                refreshOneElement={reRenderOneElement}
                CardMenu={CardMenuCourse}
                handleclickDelete={handleclickDelete}
                textModalDelete='Desea Eliminar el Curso ?'
              />
        }

      </div>
    </>
  )
}