import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import { LOGIN_URL } from "../utils/constants";
import { setToken } from "../utils/token";
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'


export default function LoginModal(){
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ isRemember, setIsRemember ] = useState(false)
  const { setAuth } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("El email no es valido.")
        .required(true, 'El password es obligatorio.'),
      password: Yup
        .string()
        .required(true, 'El password es obligatorio.')
    }),
    onSubmit: async (formData) => {
      console.log(formData);
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
        onClose()
        toast.success('Se ha logueado correctamente.')

      } catch (error) {
        // toast.error(error.message)
        console.error(error);
      }
    }
  })

  return (
    <>
      <button onClick={onOpen}>Login</button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="">Log in</ModalHeader>
                <ModalBody>
                  <form 
                    id="form-login" 
                    className="" 
                    onSubmit={formik.handleSubmit}
                  >
                    <input
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <input
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div className="">
                      <input
                        id="remember-input"
                        type="checkbox"
                        name="remember"
                        value={isRemember}
                        onChange={() => setIsRemember(!isRemember)}
                      />
                      <label htmlFor="remember-input">Recordarme</label>
                        
                    </div>
                    <button 
                      className='' 
                      type='submit' 
                    >
                        Iniciar Sesion
                    </button>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}