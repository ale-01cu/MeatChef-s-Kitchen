import { useDisclosure } from "@nextui-org/modal";
import { Image, Button } from "@nextui-org/react";
import CustomModal from "../CustomModal";
import RegisterForm from "./RegisterForm";

export default function RegisterModal(){
  const { onOpen } = useDisclosure();


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