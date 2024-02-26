import CourseForm from "../components/CourseForm.jsx"
import Header from "../components/Header.jsx"
import { useParams } from "wouter"

export default function CourseEdit() {
  const {course_id} = useParams()

  return (
    <>
      <Header typeSearch='cursos'/>
      <main>
        <CourseForm course_id={course_id}/>
      </main>
    </>
  )
}