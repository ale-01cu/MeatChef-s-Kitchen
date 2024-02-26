import useListCategories from '../hooks/useListCategories'
import { Link } from 'wouter' 
import { CLIENT_CATEGORY_URL } from '../utils/constants'

export default function ListCategories() {
  const [ categories, isLoading ] = useListCategories()

  return (
    <>
      <ul>
        {
          categories?.map(category => (
            <li key={category.id}>
              <Link to={CLIENT_CATEGORY_URL + '/category/' + category.id}>
                <span>{category.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    
    </>
  )
}