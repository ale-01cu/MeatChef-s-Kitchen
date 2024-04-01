import useAuth from '../hooks/useAuth'
import { Avatar } from '@nextui-org/react'
import AvatarIcon from '../components/Icons/AvatarIcon'
import { BASE_URL } from '../utils/constants'
import BtnChangeAvatar from '../components/Profile/BtnChangeAvatar'
import { useMemo, useState, useCallback } from 'react'
import { updateAvatar } from '../services/user'

export default function Profile() {
  const { user } = useAuth()
  const [ avatar, setAvatar ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)


  const AvatarMemo = useMemo(() => {
    const className = 'w-52 h-52'

    if(avatar) return <Avatar 
      src={URL.createObjectURL(avatar)} 
      className={className}
    />
    
    else if(user?.avatar) return <Avatar 
      src={BASE_URL + '/' + user?.avatar} 
      className={className}
    />
    
    else return <Avatar 
      fallback={<AvatarIcon/>} 
      className={className}
    />

  }, [avatar, user?.avatar])


  const handleChange = useCallback((e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.set('avatar', file)
    setIsLoading(true)
    updateAvatar(formData, user.id)
      .then(() => {
        setAvatar(file)
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [user?.id])


  if(!user) return null
  return (
    <>
      <div className='flex flex-col justify-center items-center py-24'>
        <div className='flex flex-col'>
          <h1 className='pb-12 text-3xl font-bold flex justify-center items-center gap-x-2'>
            <span className='bg-warning-400 p-2 rounded-xl'><AvatarIcon/></span>
            <span>
              Mi Perfil
            </span>
          </h1>
          <div className='flex flex-col-reverse sm:flex-row gap-24'>
            <section className='flex flex-col gap-y-3 justify-center items-start'>
              <span className='text-xl'>Nombre: {user?.full_name}</span>
              <span className='text-xl'>Telefono: {user?.phone_number}</span>
              <span className='text-xl'>Email: {user?.email}</span>
            </section>
            <section className='flex justify-center items-center relative'>
              { AvatarMemo }
              <BtnChangeAvatar handleChange={handleChange} isLoading={isLoading}/>
            </section>

          </div>

        </div>
      </div>
    </>
  )
}