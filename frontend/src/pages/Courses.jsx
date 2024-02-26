import ListCourses from "../components/ListCourses"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useParams } from "wouter"
import { listSearchCourses, listCourses } from "../services/courses"
import useAuth from "../hooks/useAuth"
import AddCourseModal from '../components/AddCourseModal'

export default function Courses() {
  const { search } = useParams()
  const { user } = useAuth()
  const [ coursesData, setCoursesData ] = useState([])
  const [ refreshComponent, setRefreshComponent ] = useState(0)

  useEffect(() => {
    if(search){
      listSearchCourses(search)
        .then(data => setCoursesData(data))
    }else {
      listCourses()
        .then(data => setCoursesData(data))
    }
  }, [search, refreshComponent])

  return (
    <>
      <Header typeSearch='cursos'/>
      <main>
        {
          search && <div>
            <h1>Resultados de la Busqueda</h1>
          </div>
        }
        <div>
          {
            search && coursesData?.length === 0 
              && <h1>No se encontraron resultados.</h1>
          }
        </div>
        {
          user?.is_teacher 
            && <AddCourseModal refreshParent={setRefreshComponent}/>
        }
        <ListCourses 
          data={coursesData} 
          user={user}
          refreshParent={setRefreshComponent}
        />
      </main>
    </>
  )
}