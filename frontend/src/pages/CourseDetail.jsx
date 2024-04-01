import { useParams } from "wouter"
import { retrieveCourses } from "../services/courses"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"
import BtnAddFavorite from "../components/Favorite/BtnAddFavorite"
import { Spinner } from "@nextui-org/react"
import GeneralError from "../components/Errors/GeneralError"
import VideoPlayer from "../components/VideoPlayer/VideoPlayer"

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

  if(isLoading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
  else if(isError) return <GeneralError/>
  else if(!course) return null

  return (
    <div>
      <div className="p-2 md:flex md:gap-x-8 md:p-12 md:justify-center">
        <section className="max-w-[1024px]">
          <VideoPlayer videoPath={course.video}/>
          {/* <video controls>
            <source 
              src={BASE_URL + '/' + course.video}
              type="video/mp4"
            />
            Tu navegador no soporta la etiqueta video.
          </video> */}
        </section>

        <section className="">
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