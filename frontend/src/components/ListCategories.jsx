import useListCategories from '../hooks/useListCategories'
import { Link, useLocation } from 'wouter' 

export default function ListCategories() {
  const [ categories, isLoading ] = useListCategories()
  const [ urlPath ] = useLocation()

  return (
    <>
      <ul>
        {
          categories?.map(category => (
            <li key={category.id}>
              <Link to={urlPath + '/' + category.name}>
                <span>{category.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    
    </>
  )
}