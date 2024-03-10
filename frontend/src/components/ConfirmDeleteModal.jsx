import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";
import DeleteIcon from './Icons/DeleteIcon'

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
      <Button className="px-0 min-w-unit-10" color="danger" onClick={onOpen} startContent={<DeleteIcon/>}/>
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
                <ModalHeader className=""></ModalHeader>
                <ModalBody>
                  <p className="text-center">{text}</p>
                  {

                    deleteIsError &&
                      <h1>Revento esta talla</h1>

                  }
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-center gap-x-10">
                    <Button type="button" color="warning">Cancelar</Button>
                    <Button 
                      onClick={() => handleclickDelete(itemId, onClose)} 
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