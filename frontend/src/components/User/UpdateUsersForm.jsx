import { Input, Checkbox, Button } from "@nextui-org/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import InputFile from '../Inputs/InputFile'
import { getUser, updateUser } from "../../services/user"
import { BASE_URL } from "../../utils/constants"
import userValidation from "../../validations/user"

export default function UpdateUsersForm({ userId, setUsers, closeModal }) {
  const [ addIsError, setAddIsError ] = useState(null)
  const [ submitIsLoading, setSubmitIsLoading ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ avatarFile, setAvatarFile ] = useState()
  const [ userData, setUserData ] = useState(null)
  const [ inputErrors, setInputErrors ] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getUser(userId)
      .then((data) => {
        setUserData(data)
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  const avatarHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setAvatarFile(file)
  }, [])


  const handleChange = useCallback((e, field) => {
    const value = e.target.value
    let newUserData = { ...userData }
    newUserData[field] = value 
    setUserData(newUserData)

  }, [userData])

  const handleChangeCheckBox = useCallback((value, field) => {
    let newUserData = { ...userData }
    newUserData[field] = value 
    setUserData(newUserData)
  }, [userData])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    
    setSubmitIsLoading(true)
    const formData = new FormData(e.target)
    formData.set('is_active', userData.is_active)
    formData.set('is_superuser', userData.is_superuser)
    formData.set('is_staff', userData.is_staff)
    formData.set('is_teacher', userData.is_teacher)
    updateUser(userId, formData)
      .then((data) => {
        setUsers(prev => {
          const newUsers = prev.map((user) => {
            if(user.id === userId) return data
            else return user
          })
          return newUsers
        })
        closeModal()
      })
      .catch((e) => {
        console.error(e);
        setAddIsError(e)
      })
      .finally(() => {
        setSubmitIsLoading(false)
      })
  }, [
    closeModal, 
    setUsers, 
    userId, 
    userData?.is_active, 
    userData?.is_superuser,
    userData?.is_staff,
    userData?.is_teacher,
  ])

  const Avatar = useMemo(() => !userData?.avatar && !avatarFile
    ? null
    : (
      <div className="flex justify-center">
        <img 
          className="w-[250px] h-[250px] object-cover rounded-full" 
          src={avatarFile 
            ? URL.createObjectURL(avatarFile) 
            : BASE_URL + '/' + userData.avatar
          } 
          alt="avatar"
        />
      </div>
    ), [avatarFile, userData])

  if(isLoading) return <h1>Cargando</h1>
  if(!userData) return null
  return (
    <>

      <form 
        id="update-user" 
        className="flex flex-col gap-y-2" 
        onSubmit={handleSubmit}
      >
        <Input
          label="Correo"
          name="email"
          placeholder="Correo"
          onChange={(e) => handleChange(e, 'email')}
          value={userData.email}
        />

        <Input
          label="Nombre"
          name="full_name"
          placeholder="Nombre Completo"
          onChange={(e) => handleChange(e, 'full_name')}
          value={userData.full_name}
        />

        <Input
          label="Numero Telefonico"
          name="phone_number"
          placeholder="Numero de Telefono"
          onChange={(e) => handleChange(e, 'phone_number')}
          value={userData.phone_number}
        />

        <InputFile 
          name='avatar'
          fileAccept='image/jpeg, image/png' 
          text='Cambiar Avatar'
          handleChange={avatarHandleChange}
        />


        { Avatar }

        <div className="p-2 flex flex-col gap-y-4">
          <Checkbox 
            defaultSelected 
            name="is_active" 
            color="success"
            onValueChange={(e) => handleChangeCheckBox(e, 'is_active')} 
            isSelected={userData.is_active}
          >
            Activo
          </Checkbox>
          <div className="flex gap-x-2">
            <Checkbox 
              defaultSelected 
              name="is_superuser" 
              color="secondary"
              onValueChange={(e) => handleChangeCheckBox(e, 'is_superuser')} 
              isSelected={userData.is_superuser}
            >
              Admin
            </Checkbox>

            <Checkbox 
              defaultSelected 
              name="is_staff" 
              color="primary"
              onValueChange={(e) => handleChangeCheckBox(e, 'is_staff')} 
              isSelected={userData.is_staff}
            >
              Dependiente
            </Checkbox>

            <Checkbox 
              defaultSelected 
              name="is_teacher" 
              color="warning"
              onValueChange={(e) => handleChangeCheckBox(e, 'is_teacher')} 
              isSelected={userData.is_teacher}
            >
              Profesor
            </Checkbox>

          </div>

        </div>

        {
          addIsError &&
            <h1>Revento esta talla</h1>
        }
        <Button 
          className='mt-5' 
          type='submit'
          color="primary" 
          isLoading={submitIsLoading}
        >
            Guardar
        </Button>
      </form>
    </>
  )
}