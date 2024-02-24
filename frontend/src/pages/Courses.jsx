import ListCourses from "../components/ListCourses"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useParams } from "wouter"
import { listSearchCourses, listCourses } from "../services/courses"


export default function Courses() {
  const { search } = useParams()
  const [ coursesDData, setCoursesData ] = useState([])


  useEffect(() => {
    if(search){
      listSearchCourses(search)
        .then(data => setCoursesData(data))
    }else {
      listCourses()
        .then(data => setCoursesData(data))
    }
  }, [search])

  return (
    <>
      <Header typeSearch='cursos'/>
      <main>
        {
          search && coursesDData.length === 0 
            ? <h1>No se encontraron resultados.</h1>
            : <h1>Resultados de la busqueda</h1> 
        }
        <ListCourses data={coursesDData}/>
      </main>
    </>
  )
}