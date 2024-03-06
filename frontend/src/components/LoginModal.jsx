import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Input,
  Button,
  Checkbox,
  Image
} from "@nextui-org/react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import { LOGIN_URL } from "../utils/constants";
import { setToken } from "../utils/token";
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import MailIcon from "./MailIcon";
import LockIcon from "./LockIcon";

export default function LoginModal(){
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ isRemember, setIsRemember ] = useState(false)
  const { setAuth, setMyUser } = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)

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
      try {
        const res = await fetch(LOGIN_URL, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        const data = await res.json()

        if(!res.ok) {
          throw new Error('Lo sentimos. Ocurrio un error al loguear al usuario.')
        }

        const { access_token } = data
        setToken(`bearer ${access_token}`, isRemember)
        setAuth(true)
        setMyUser()
        onClose()
        toast.success('Se ha logueado correctamente.')

      } catch (error) {
        // toast.error(error.message)
        console.error(error);

      } finally {

        setIsLoading(true)

      }
    }
  })

  return (
    <>
      <Button 
        onClick={onOpen} 
        color="default" 
        variant="bordered" 
        className="text-white font-bold w-1/2 hover:scale-105"
      >
        Login
      </Button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          backdrop='blur'
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex justify-center">
                  <Image
                    src="/Recurso 6.png"
                    alt="Logo"
                    width={300}
                  />
                </ModalHeader>
                <ModalBody>
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
                        classNames={{
                          label: "text-small",
                        }}
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
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}