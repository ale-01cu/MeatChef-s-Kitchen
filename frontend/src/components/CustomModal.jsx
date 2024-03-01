import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Button
} from "@nextui-org/react";
import React from "react";

export default function CustomModal({btnText, headerText, children}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>{ btnText }</Button>
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