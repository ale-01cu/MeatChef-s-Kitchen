import {  
  useDisclosure,
  Button,
  Image
} from "@nextui-org/react";
import CustomModal from "../CustomModal";
import LoginForm from "./LoginForm";

export default function LoginModal(){
  const { onOpen } = useDisclosure();

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