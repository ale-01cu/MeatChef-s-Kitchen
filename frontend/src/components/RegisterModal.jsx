import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure
} from "@nextui-org/modal";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REGISTER_URL } from "../utils/constants";
import { toast } from 'react-toastify'
import { Image, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function RegisterModal(){
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ isLoading, setIsLoading ] = useState(false)

  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone_number: '',
      email: '',
      password: '',
      repeatPassword: ''
    },

    validationSchema: Yup.object({
      full_name: Yup
        .string('El nombre debe de ser un texto.')
        .required('El nombre es obligatorio.'), 
      phone_number: Yup
        .string('El numero telefonico debe de ser un texto')
        .matches(/^[a-zA-Z0-9-]*$/, "El numero telefonico no puede tener espacio.")
        .required('El numero telefonico es obligatorio.'),
      email: Yup
        .string('El email debe de ser un texto')
        .email("El email no es valido")
        .required("El email es obligatorio."),
      password: Yup
        .string('El contraseña debe de ser un texto')
        .required("El contraseña es obligatorio.")
        .min(6, 'El contraseña debe de tener como minimo 6 caracteres.')
        .max(25, 'La contraseña debe de ser de almenos 25 caracteres')
        .oneOf([Yup.ref("repeatPassword")], "Los contraseña no coinciden."),
      repeatPassword: Yup
        .string('El confirmar contraseña debe de ser un texto')
        .required("El contraseña es obligatorio.")
        .min(6, 'El confirmar contraseña debe de tener como minimo 6 caracteres.')
        .max(25, 'La contraseña debe de ser de almenos 25 caracteres')
        .oneOf([Yup.ref("password")], "Los passwords no coinciden."),
    }),
    
    onSubmit: async (formData) => {
      setIsLoading(true)
      try {
        console.log(formData);
        const res = await fetch(REGISTER_URL, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })

        if(!res.ok) {
          throw new Error('Lo sentimos. Ocurrio un error al registrarse.')
        }

        alert('Se ha registrado correctamente.')
        onClose()
        toast.success('Se ha registrado correctamente.')


      } catch (error) {
        console.log(error);
      
      }finally {

        setIsLoading(false)

      }
    }
  })

  return (
    <>
      <Button 
        onClick={onOpen} 
        variant="solid" 
        className="bg-white font-bold w-1/2 text-black hover:scale-105"
      >
        Registrarme
      </Button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
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
                    id="form-register" 
                    className="flex flex-col gap-y-2 py-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <Input
                      label="Nombre"
                      placeholder="Escriba su nombre y apellidos"
                      name="full_name"
                      onChange={formik.handleChange}
                      value={formik.values.full_name}
                      isInvalid={formik.errors.full_name ? true : false}
                      errorMessage={formik.errors.full_name}

                    />
                    <Input
                      label="Numero de Telefono"
                      placeholder="Escriba su Numero de Telefono"
                      name="phone_number"
                      onChange={formik.handleChange}
                      value={formik.values.phone_number}
                      isInvalid={formik.errors.phone_number ? true : false}
                      errorMessage={formik.errors.phone_number}

                    />
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      isInvalid={formik.errors.email ? true : false}
                      errorMessage={formik.errors.email}
                      
                    />
                    <Input
                      label="Password"
                      placeholder="Escriba su password"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.passwrod}
                      isInvalid={formik.errors.password ? true : false}
                      errorMessage={formik.errors.password}

                    />
                    <Input
                      label="Repeat Password"
                      placeholder="Escriba su password una vez mas"
                      type="password"
                      name="repeatPassword"
                      onChange={formik.handleChange}
                      value={formik.values.repeatPassword}
                      isInvalid={formik.errors.repeatPassword ? true : false}
                      errorMessage={formik.errors.repeatPassword}

                    />
                    <Button 
                      color="primary"
                      type='submit' 
                      className="mt-6"
                      isLoading={isLoading}
                    >
                      Registrarme
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