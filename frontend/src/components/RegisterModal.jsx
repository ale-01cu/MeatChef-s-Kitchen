import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { REGISTER_URL } from "../utils/constants";
import { toast } from 'react-toastify'

export default function RegisterModal(){
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

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
        .string('El password debe de ser un texto')
        .required("El password es obligatorio.")
        .min(6, 'El password debe de tener como minimo 6 caracteres.')
        .max(25)
        .oneOf([Yup.ref("repeatPassword")], "Los passwords no coinciden."),
      repeatPassword: Yup
        .string('El confirmar password debe de ser un texto')
        .required("El password es obligatorio.")
        .min(6, 'El confirmar password debe de tener como minimo 6 caracteres.')
        .max(25)
        .oneOf([Yup.ref("password")], "Los passwords no coinciden."),
    }),
    
    onSubmit: async (formData) => {
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
                <ModalHeader className="">Registro</ModalHeader>
                <ModalBody>
                  <form 
                    id="form-register" 
                    className=""
                    onSubmit={formik.handleSubmit}
                  >
                    <input
                      placeholder="Escriba su nombre y apellidos"
                      name="full_name"
                      onChange={formik.handleChange}
                      value={formik.values.full_name}
                    />
                    <input
                      label="Numero de Telefono"
                      placeholder="Escriba su Numero de Telefono"
                      name="phone_number"
                      onChange={formik.handleChange}
                      value={formik.values.phone_number}
                    />
                    <input
                      label="Email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <input
                      label="Password"
                      placeholder="Escriba su password"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.passwrod}
                    />
                    <input
                      label="Repeat Password"
                      placeholder="Escriba su password una vez mas"
                      type="password"
                      name="repeatPassword"
                      onChange={formik.handleChange}
                      value={formik.values.repeatPassword}
                    />
                    <button 
                      className='' 
                      type='submit' 
                    >
                      Registrarme
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