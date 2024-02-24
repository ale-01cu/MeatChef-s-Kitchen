import Card from './Card'

export default function ListMeats({data}) {
  return (
    <>
      <ul>
        {
          data?.map(meat => (
            <li key={meat.id}>
              <Card 
                image={meat.photo}
                name={meat.name_of_the_cut_of_meat}
                description={meat.description}
                btnText='Comprar'
                path='#'
              />
            </li>
          ))
        }
      </ul>
    
    </>
  )
}