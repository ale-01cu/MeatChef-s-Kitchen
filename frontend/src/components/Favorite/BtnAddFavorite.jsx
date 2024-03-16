import { useEffect, useState } from 'react'
import StarFill from '../Icons/StarFillIcon'
import Star from '../Icons/StarIcon'
import { Button } from '@nextui-org/react'
import { 
  courseIsInFavorites, 
  deleteCourseFromFavorites, 
  addToFavorites 
} from '../../services/favorite'
import useRoles from '../../hooks/useRoles'

export default function BtnAddFavorite({ course }) {
  const { isClient } = useRoles()
  const [ isInFav, setIsInFav ] = useState(false)

  useEffect(() => {
    const is = courseIsInFavorites(course.id)
    setIsInFav(is)
  }, [course.id])

  const handleClick = () => {
    if(isInFav) {
      deleteCourseFromFavorites(course.id)
      setIsInFav(false)

    }else {
      addToFavorites(course)
      setIsInFav(true)

    }
  }

  if(!isClient) return null
  return (
    <Button 
      color='warning' 
      variant='solid' 
      startContent={isInFav ? <StarFill/> : <Star/>}
      onPress={handleClick}
    >
      Favorito
    </Button>
  )
}