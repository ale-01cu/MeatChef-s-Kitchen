import useListMeats from "../hooks/useListMeats"
import Card from './Card'

export default function ListMeats() {
  const [ meats, isLoading ] = useListMeats()
  return (
    <>
      <ul>
        {
          meats?.map(meat => (
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