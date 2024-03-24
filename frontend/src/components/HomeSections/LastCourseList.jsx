import CardNextUi from "../Card/CardNextUi"
import { Link } from "wouter"
import { useEffect, useState } from "react"
import { listLastCourses } from "../../services/courses"
import HomeListsSkeleton from "../Skeletons/HomeListsSkeleton"

export default function LastCourseList() {
  const [ lastCourses, setLastCourses ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    listLastCourses()
      .then((data) => {
        setLastCourses(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if(isLoading) return <HomeListsSkeleton/>
  return (
    <>
      <h1 className="p-8 text-2xl font-bold text-center">
        Cursos de Meat Chef's
      </h1>

      <ul className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-wrap md:flex-row justify-center items-center gap-4">
        {

          lastCourses.map((course) => (
            <li key={course.id} className="relative flex">
              <CardNextUi
                id={course.id}
                alt={course.name}
                image={course.photo}
                title={course.name}
                to={'/cursos/' + course.id}
              />
            </li>
          ))
        }
      </ul>
      <div className="flex justify-center pt-12">
        <Link
          to="/cursos"
          className="p-3 bg-default-200 rounded-xl"
        >
          Ver Mas
        </Link>
      </div>
    </>
  )
}