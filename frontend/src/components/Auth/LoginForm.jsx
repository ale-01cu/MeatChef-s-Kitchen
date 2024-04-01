import {  
  Input,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { useFormik } from 'formik'
import { useState } from "react";
import { setToken } from "../../utils/token";
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import MailIcon from "../Icons/MailIcon";
import LockIcon from "../Icons/LockIcon";
import { login } from "../../services/auth";
import loginValidation from "../../validations/login";
import GeneralError from '../Errors/GeneralError'

export default function LoginForm({ closeModal }){
  const [ isRemember, setIsRemember ] = useState(false)
  const { setMyUser } = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()

  const formik = useFormik({
    initialValues: loginValidation.initialValues,
    validationSchema: loginValidation.validationSchema,
    onSubmit: async (formData) => {
      setIsLoading(true)
      login(formData)
        .then((data) => {
          const { access_token } = data
          setToken(`bearer ${access_token}`, isRemember)
          setMyUser()
          closeModal()
          toast.success('Se ha logueado correctamente.')
        })
        .catch((e) => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => {
          setIsLoading(false)

        })

    }
  })

  if(isError) return <GeneralError/>
  return (
    <>
      <form 
        id="form-login" 
        className="flex flex-col gap-y-2 py-4" 
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          placeholder="Introduzca su Correo..."
          onChange={formik.handleChange}
          value={formik.values.email}
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          classNames={{
            input: [
                "bg-transparent active:bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50", 
                "dark:placeholder:text-white/60",
            ]
          }}
          isInvalid={formik.errors.email ? true : false}
          errorMessage={formik.errors.email}
        />
        <Input
          label="Contraseña"
          name="password"
          placeholder="Introduzca su Constraseña..."
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          isInvalid={formik.errors.password ? true : false}
          errorMessage={formik.errors.password}
        />
        <div className="flex justify-end mb-5 py-2">
          <Checkbox
            name="remember"
            classNames={{ label: "text-small" }}
            onChange={() => setIsRemember(!isRemember)}
            value={isRemember}
          >
            Recordarme
          </Checkbox>
            
        </div>
        <Button 
          color="primary"
          type='submit' 
          isLoading={isLoading}
        >
          Iniciar Sesion
        </Button>
      </form>
    </>
  )
}