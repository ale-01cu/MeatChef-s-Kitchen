import { Input, Checkbox, Button, Image } from "@nextui-org/react"
import { useCallback, useMemo, useState } from "react"
import InputFile from '../Inputs/InputFile'
import { createUser } from "../../services/user"
import GeneralError from "../Errors/GeneralError"

export default function AddUsersForm({ setUsers, closeModal }) {
  const [ addIsError, setAddIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ avatarFile, setAvatarFile ] = useState()
  const [ userData, setUserData ] = useState({
    email: '',
    avatar: null,
    full_name: '',
    phone_number: '',
    password: '',
    repeatPassword: '',
    is_active: true,
    is_superuser: false,
    is_staff: false,
    is_teacher: false
  })

  const avatarHandleChange = useCallback((e) => {
    const file = e.target.files[0]
    setAvatarFile(file)
  }, [])


  const handleChange = useCallback((e, field) => {
    const value = e.target.value
    let newUserData = {
      ...userData
    }
    newUserData[field] = value 
    setUserData(newUserData)
  }, [userData])

  const handleChangeCheckBox = useCallback((value, field) => {
    let newUserData = {
      ...userData
    }
    newUserData[field] = value 
    setUserData(newUserData)
  }, [userData])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setIsLoading(true)
    const formData = new FormData(e.target)
    createUser(formData)
      .then((data) => {
        setUsers(prev => [...prev, data])
        closeModal()
      })
      .catch((e) => {
        console.error(e);
        setAddIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const Avatar = useMemo(() => avatarFile && 
    (<div className="flex justify-center">
      <Image 
        className="w-[250px] h-[250px]" 
        radius="full"
        src={URL.createObjectURL(avatarFile)} 
        alt="avatar"
        classNames={{
          img: 'object-cover'
        }} 
      />
    </div>), [avatarFile])

  return (
    <>

      <form 
        id="create-meat" 
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

        <Input
          label="Password"
          placeholder="Escriba su password"
          type="password"
          name="password"
          onChange={(e) => handleChange(e, 'password')}
          value={userData.password}

        />
        <Input
          label="Repeat Password"
          placeholder="Escriba su password una vez mas"
          type="password"
          name="repeatPassword"
          onChange={(e) => handleChange(e, 'repeatPassword')}
          value={userData.repeatPassword}

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
            value={userData.is_active}
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
              value={userData.is_superuser}
              onValueChange={(e) => handleChangeCheckBox(e, 'is_superuser')} 
              isSelected={userData.is_superuser}
            >
              Admin
            </Checkbox>

            <Checkbox 
              defaultSelected 
              name="is_staff" 
              color="primary"
              value={userData.is_staff}
              onValueChange={(e) => handleChangeCheckBox(e, 'is_staff')} 
              isSelected={userData.is_staff}
            >
              Dependiente
            </Checkbox>

            <Checkbox 
              defaultSelected 
              name="is_teacher" 
              color="warning"
              value={userData.is_teacher}
              onValueChange={(e) => handleChangeCheckBox(e, 'is_teacher')} 
              isSelected={userData.is_teacher}
            >
              Profesor
            </Checkbox>

          </div>

        </div>

        {
          addIsError &&
            <GeneralError/>
        }
        <Button 
          className='mt-5' 
          type='submit'
          color="primary" 
          isLoading={isLoading}
        >
            Guardar
        </Button>
      </form>
    </>
  )
}