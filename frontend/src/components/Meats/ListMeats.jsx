import Card from '../Card/Card'

export default function ListMeats(props) {
  const { 
    data, 
    refreshOneElement, 
    CardMenu,
    handleclickDelete,
    textModalDelete
  } = props

  return (
    <section className='py-5'>
      <ul className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {
          data?.map(meat => (
            <li key={meat.id} className='w-full relative flex justify-center hover:scale-105 transition'>
              <Card 
                image={meat.photo}
                name={meat.name_of_the_cut_of_meat}
                description={meat.description}
                btnText='Comprar'
                path={'/carnicos/' + meat.id}
              />
              {
                CardMenu &&
                  <CardMenu
                    itemId={meat.id}
                    isActive={meat.is_active}
                    handleclickDelete={handleclickDelete}
                    textModalDelete={textModalDelete}
                    refreshOneElement={refreshOneElement}
                  />
              }

            </li>
          ))
        }
      </ul>
    
    </section>
  )
}