import useAuth from '../hooks/useAuth'
import { Avatar } from '@nextui-org/react'
import AvatarIcon from '../components/Icons/AvatarIcon'
import { BASE_URL } from '../utils/constants'
import MeatMenu from '../components/MeatMenu'

export default function Profile() {
  const { user, auth } = useAuth()

  if(!user && !auth) return <MeatMenu/>
  if(!user) return <h1>Cargando</h1>
  return (
    <>
      <MeatMenu/>
      <div className='flex flex-col justify-center items-center py-24'>
        <div className='flex flex-col'>
          <h1 className='pb-12 text-3xl font-bold flex justify-center items-center gap-x-2'>
            <span className='bg-warning-400 p-2 rounded-xl'><AvatarIcon/></span>
            Perfil de Usuario
          </h1>
          <div className='flex flex-col-reverse sm:flex-row gap-24'>
            <section className='flex flex-col gap-y-3 justify-center items-start'>
              <span className='text-xl'>Nombre: {user?.full_name}</span>
              <span className='text-xl'>Telefono: {user?.phone_number}</span>
              <span className='text-xl'>Email: {user?.email}</span>
            </section>
            <section className='flex justify-center items-center'>
              {
                !user?.avatar 
                  ?  <Avatar fallback={<AvatarIcon/>} className='w-36 h-36'/>
                  :  <Avatar src={BASE_URL + '/' + user?.avatar} className='w-36 h-36'/>
              }
            </section>

          </div>

        </div>
      </div>
    </>
  )
}