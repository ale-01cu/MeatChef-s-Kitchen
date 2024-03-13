import {  
  Input,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import { setToken } from "../../utils/token";
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import MailIcon from "../Icons/MailIcon";
import LockIcon from "../Icons/LockIcon";
import { login } from "../../services/auth";


export default function LoginForm({ closeModal }){
  const [ isRemember, setIsRemember ] = useState(false)
  const { setAuth, setMyUser } = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string('El email debe de ser un texto.')
        .email("El email no es valido.")
        .required(true, 'El password es obligatorio.'),
      password: Yup
        .string('La contraseña debe ser de tipo texto.')
        .required(true, 'El password es obligatorio.')
    }),
    onSubmit: async (formData) => {
      setIsLoading(true)
      login(formData)
        .then((data) => {
          const { access_token } = data
          setToken(`bearer ${access_token}`, isRemember)
          setAuth(true)
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

  return (
    <>
      { isError && <h1>Revento esta talla</h1> }
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
                "bg-transparent",
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