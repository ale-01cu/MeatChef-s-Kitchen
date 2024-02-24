import Card from './Card'

export default function ListCourses({data}) {

  return (
    <>
      <ul>
        {
          data?.map(course => (
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