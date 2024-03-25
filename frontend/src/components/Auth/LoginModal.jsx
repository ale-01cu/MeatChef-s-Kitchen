import {  
  useDisclosure,
  Button,
  Image
} from "@nextui-org/react";
import CustomModal from "../Modals/CustomModal";
import LoginForm from "./LoginForm";
import useRoles from "../../hooks/useRoles";

export default function LoginModal(){
  const { onOpen } = useDisclosure();
  const { isAuthenticated } = useRoles()

  if(isAuthenticated || isAuthenticated == undefined) return null
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