import { useParams } from "wouter"
import { retrieveCourses } from "../services/courses"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"
import BtnAddFavorite from "../components/Favorite/BtnAddFavorite"
import CourseMenu from "../components/Course/CourseMenu"

export default function CourseDetail() {
  const { course_id } = useParams()
  const [ course, setCourse ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()

  useEffect(() => {
    setIsLoading(true)
    retrieveCourses(course_id)
      .then(data => setCourse(data))
      .catch((e) => {
        console.error(e)
        setIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [course_id])

  if(isLoading) return <h1>Cargando</h1>
  else if(isError) return <h1>Revento esta talla</h1>
  else if(!course) return null

  return (
    <div>
      <CourseMenu/>
      <div className="flex py-20 px-52 justify-center gap-x-12">
        <section className="w-1/2">
          <video controls>
            <source 
              src={BASE_URL + '/' + course.video}
              type="video/mp4"
            />
            Tu navegador no soporta la etiqueta video.
          </video>
        </section>

        <section className="w-1/2 flex justify-center">
          <div className="flex flex-col gap-y-4 items-start w-max">
            <h1 className="font-bold text-5xl">{course.name}</h1>
            <p className="max-w-96">{course.description}</p>
            <BtnAddFavorite course={course}/>
          </div>
        </section>

      </div>
      
    </div>
  )
}