import {  
  useDisclosure,
  Input,
  Button,
  Checkbox,
  Image
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
import CustomModal from "../CustomModal";
import LoginForm from "./LoginForm";

export default function LoginModal(){
  const { onOpen, onClose } = useDisclosure();
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
          onClose()
          toast.success('Se ha logueado correctamente.')

        })
        .catch((e) => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => {
          setIsLoading(true)

        })

    }
  })

  return (
    <>

      <CustomModal
        btnText='Iniciar Session'
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
            color="default" 
            variant="bordered" 
            className="text-white font-bold w-1/2 hover:scale-105"
          >
            Login
          </Button>
        }
      >
        <LoginForm/>
      </CustomModal>
    </>
  )
}