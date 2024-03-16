import { Link } from 'wouter'
import FavoriteIcon from '../Icons/FavoriteIcon'
import useAuth from '../../hooks/useAuth'

export default function BtnFavorite() {
  const { user } = useAuth()

  if(!user || user?.is_teacher) return null
  return (
    <Link 
      to='/favoritos' 
      className='text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition flex justify-center items-center gap-x-2'
    >
      <span><FavoriteIcon/></span>
      <span>Mis Cursos</span>
    </Link>
  )
}