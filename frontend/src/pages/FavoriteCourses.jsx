import { useState } from "react"
import ListCourses from "../components/Course/ListCourses"
import { getFavorites } from "../services/favorite"
import CardMenuFavoriteCourse from "../components/Card/CardMenuFavoriteCourse"
import { deleteCourseFromFavorites } from "../services/favorite"

export default function FavoriteCourses() {
  const [ courses, setCourses ] = useState([])


  useState(() => {
    const coursesFav = getFavorites()
    setCourses(coursesFav)
  }, [])

  const handleclickDelete = (courseId, onClose, setIsLoadingDelete) => {
    setIsLoadingDelete(true)
    deleteCourseFromFavorites(courseId)
    setCourses(courses.filter((course) => course.id !== courseId))
    setIsLoadingDelete(false)
    onClose()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold p-8 text-center">
        Mis Cursos
      </h1>
      <section className="p-24">
        <ListCourses 
          data={courses} 
          CardMenu={CardMenuFavoriteCourse}
          handleclickDelete={handleclickDelete}
          textModalDelete='Desea Eliminar el curso de favoritos ?'
        />
      </section>
    </div>
  )
}