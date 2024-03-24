import {  
  Modal, 
  ModalContent, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";
import DeleteIcon from './Icons/DeleteIcon'
import { useState } from "react";
import CustomModal from "./CustomModal";

export default function ConfirmDeleteModal (props) {
  const { 
    itemId, 
    text, 
    handleclickDelete,
    btnText } = props
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)
  const [ deleteIsError, setDeleteIsError ] = useState(null)


  return (
    <>
      {
        btnText
          ? (
            <Button 
              className="px-0 min-w-unit-10 hover:scale-110" 
              color="danger"
              variant="light" 
              onClick={onOpen} 
              startContent={<DeleteIcon/>}
            />
          )
          : <Button 
              className="px-0 min-w-unit-10 hover:scale-110" 
              color="danger" 
              onClick={onOpen} 
              startContent={<DeleteIcon/>}
            />
      }

      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            }
          }}
        >
          <ModalContent>
            {() => (
              <>
                <ModalBody>
                  <p className="text-center p-4">{text}</p>
                  {

                    deleteIsError &&
                      <h1>Revento esta talla</h1>

                  }
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-center gap-x-10">
                    <Button 
                      type="button" 
                      color="warning"
                      onPress={() => onClose()}
                      >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={() => handleclickDelete(
                        itemId, 
                        onClose, 
                        setIsLoadingDelete, 
                        setDeleteIsError)} 
                      className=""
                      isLoading={isLoadingDelete}
                      color="danger"
                    >
                      Aceptar
                    </Button>

                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}