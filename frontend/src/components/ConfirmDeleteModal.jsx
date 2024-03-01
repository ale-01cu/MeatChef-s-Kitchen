import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";

export default function ConfirmDeleteModal (props) {
  const { 
    itemId, 
    text, 
    handleclickDelete, 
    deleteIsError,
    isLoadingDelete } = props
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();


  return (
    <>
      <Button onClick={onOpen}>Eliminar</Button>
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="">Cruz comica</ModalHeader>
                <ModalBody>
                  <p>{text}</p>
                  {

                    deleteIsError &&
                      <h1>Revento esta talla</h1>

                  }
                </ModalBody>
                <ModalFooter>
                  <Button type="button">Cancelar</Button>
                  <Button 
                    onClick={() => handleclickDelete(itemId, onClose)} 
                    className=""
                    isLoading={isLoadingDelete}
                  >
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}