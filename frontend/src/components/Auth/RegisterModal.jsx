import { useDisclosure } from "@nextui-org/modal";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Image, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { register } from "../../services/auth";
import CustomModal from "../CustomModal";
import RegisterForm from "./RegisterForm";

export default function RegisterModal(){
  const { onOpen, onClose } = useDisclosure();
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()

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
      register(formData)
        .then(() => {
          onClose()
          toast.success('Se ha registrado correctamente.')

        })
        .catch((e) => {
          console.log(e);
          setIsError(e)
        })
        .finally(() => {
          setIsLoading(false)

        })

    }
  })

  return (
    <>

      <CustomModal
        headerText={
          <Image
            src="/Recurso 6.png"
            alt="Logo"
            width={300}
          />
        }
        btnOpen={
          <Button 
            onClick={onOpen} 
            variant="solid" 
            className="bg-white font-bold w-1/2 text-black hover:scale-105"
          >
            Registrarme
          </Button>
        }
      >
        <RegisterForm/>
      </CustomModal>
    </>
  )
}