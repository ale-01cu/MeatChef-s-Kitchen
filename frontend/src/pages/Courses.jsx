import ListCourses from "../components/Course/ListCourses"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useParams } from "wouter"
import { listSearchCourses, listCourses } from "../services/courses"
import useAuth from "../hooks/useAuth"
import CustomModal from "../components/CustomModal"
import AddCourseForm from "../components/Course/AddCourseForm"
import { retrieveCourses } from "../services/courses"

export default function Courses() {
  const { search } = useParams()
  const { user } = useAuth()
  const [ coursesData, setCoursesData ] = useState([])
  const [ refreshComponent, setRefreshComponent ] = useState(0)
  const [ isError, setIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const reRenderOneElement = (courseId) => {
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
  }

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

  return (
    <>
      <div className="p-10">
        {
          user?.is_teacher
          && <div className="w-full flex justify-end">
                <CustomModal
                  btnText='Nuevo Curso'
                  headerText='Crear Curso'
                  >
                  <AddCourseForm refreshParent={setRefreshComponent}/>
                </CustomModal>
              </div>
        }

        {
          !isError && search && <div>
            <h1 className="text-4xl font-extrabold text-center p-2">Resultados de la Busqueda</h1>
          </div>
        }
        
        {
          !isError && search && coursesData?.length === 0 
            && <div><h1 className="text-center text-pretty">No se encontraron resultados :(</h1></div>
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
                refreshParent={setRefreshComponent}
                refreshOneElement={reRenderOneElement}
              />
        }

        {
          isLoading && <h1>Cargando</h1>
        }

        {
          isError &&
            <h1>Exploto esta talla</h1>
        }

      </div>
    </>
  )
}