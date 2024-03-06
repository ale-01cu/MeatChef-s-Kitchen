import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Button
} from "@nextui-org/react";
import React from "react";
import AddIcon from './AddIcon'

export default function CustomModal({btnOpen, btnText, headerText, children}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {
        !btnOpen 
          ? <Button 
            onClick={onOpen} 
            color="success" 
            startContent={<AddIcon/>}>
              { btnText }
            </Button>
          : React.cloneElement(btnOpen, { onClick: onOpen }) 
      }
      
      <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="center"
          scrollBehavior='inside'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="">
                  { headerText }
                </ModalHeader>
                <ModalBody>
                  {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                      return React.cloneElement(
                        child, 
                        { closeModal: onClose }
                      )
                    }
                    return child
                  })}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  )
}