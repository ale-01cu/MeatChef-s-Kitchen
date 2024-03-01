import Header from "../components/Header.jsx"
import { useParams } from "wouter"
import UpdateCourseForm from "../components/Course/UpdateCourseForm.jsx.jsx"

export default function CourseEdit() {
  const {course_id} = useParams()

  return (
    <>
      <Header typeSearch='cursos'/>
      <main>
        <UpdateCourseForm courseId={course_id}/>
      </main>
    </>
  )
}