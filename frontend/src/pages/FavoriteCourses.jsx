import { useState } from "react"
import ListCourses from "../components/Course/ListCourses"
import { getFavorites } from "../services/favorite"

export default function FavoriteCourses() {
  const [ courses, setCourses ] = useState([])

  useState(() => {
    const coursesFav = getFavorites()
    setCourses(coursesFav)
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold p-8 text-center">Mis Cursos</h1>
      <section className="p-24">
        <ListCourses data={courses}/>
      </section>
    </div>
  )
}