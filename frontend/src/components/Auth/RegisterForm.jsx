import { useDisclosure } from "@nextui-org/modal";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { register } from "../../services/auth";

export default function RegisterForm(){
  const { onClose } = useDisclosure();
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
      { isError && <h1>Revento esta talla</h1> }
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
    </>
  )
}