import { useParams } from "wouter"
import { retrieveCourses } from "../services/courses"
import { useEffect, useState } from "react"
import Header from "../components/Header"

export default function CourseDetail() {
  const { course_id } = useParams()
  const [ course, setCourse ] = useState()

  useEffect(() => {
    retrieveCourses(course_id)
      .then(data => setCourse(data))
  }, [course_id])

  if(!course) return null
  return (
    <div>
      <Header typeSearch='cursos'/>
      <h1>{course.name}</h1>
    </div>
  )
}