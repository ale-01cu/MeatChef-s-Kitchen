import { useParams } from "wouter"
import { retrieveCourses } from "../services/courses"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import useAuth from "../hooks/useAuth"
import { BASE_URL } from "../utils/constants"
import { Button } from "@nextui-org/react"
import StarIcon from '../components/Icons/StarIcon'

export default function CourseDetail() {
  const { user } = useAuth()
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
    <main>
      <Header typeSearch='cursos'/>
      
      <div className="flex p-20 justify-center gap-x-24">
        <section className="w-1/2">
          <video controls>
            <source 
              src={BASE_URL + '/' + course.video}
              type="video/mp4"
            />
            Tu navegador no soporta la etiqueta video.

          </video>
        </section>

        <section className="flex flex-col gap-y-4 w-1/2 items-start">
          <h1 className="font-bold text-5xl">{course.name}</h1>
          <p>{course.description}</p>
          <Button 
            type='submit'
            color="warning" 
            isLoading={false}
            startContent={<StarIcon/>}
          >
              Favorito
          </Button>
        </section>

      </div>
      
    </main>
  )
}