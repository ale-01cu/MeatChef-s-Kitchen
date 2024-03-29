import {  
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  Button
} from "@nextui-org/react";
import React from "react";
import AddIcon from '../Icons/AddIcon'

export default function CustomModal(props) {
  const { btnOpen, btnText, headerText, children, className, size } = props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {
        !btnOpen 
          ? <Button 
              onClick={onOpen} 
              color="success"
              startContent={<AddIcon/>}
            >
              { btnText }
            </Button>
          : React.cloneElement(btnOpen, { onClick: onOpen }) 
      }
      
      <Modal
        size={size}
        className={className} 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior='inside'
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
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                { headerText }
              </ModalHeader>
              <ModalBody className="p-5">
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