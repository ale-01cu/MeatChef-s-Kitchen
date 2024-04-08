import Card from '../Card/Card.jsx'

export default function ListCourses(props) {
  const { 
    data, 
    refreshOneElement, 
    CardMenu,
    handleclickDelete,
    textModalDelete } = props


  return (
    <section className='py-5'>
      <ul className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {
          data?.map(course => (
            <li key={course?.id} className='relative flex justify-center hover:scale-105 transition'>
              <Card 
                image={course?.photo}
                name={course?.name}
                author={course?.teacher?.full_name}
                description={course?.description}
                path={'/cursos/' + course?.id}
              />
              <CardMenu
                itemId={course?.id}
                isActive={course?.is_active}
                handleclickDelete={handleclickDelete}
                textModalDelete={textModalDelete}
                refreshOneElement={refreshOneElement}
              />

            </li>
          ))
        }
      </ul>
    
    </section>
  )
}