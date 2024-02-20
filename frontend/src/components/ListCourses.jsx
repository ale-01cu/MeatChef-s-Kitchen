import useListCourses from '../hooks/useListCourses'
import Card from './Card'

export default function ListCourses() {
  const [ courses, isLoading ] = useListCourses()

  return (
    <>
      <ul>
        {
          courses?.map(course => (
            <li key={course.id}>
              <Card 
                image={course.photo}
                name={course.name}
                description={course.description}
                path='#'
              />
            </li>
          ))
        }
      </ul>
    
    </>
  )
}