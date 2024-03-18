import ConfirmDeleteModal from "../ConfirmDeleteModal"
import CustomModal from '../CustomModal.jsx'
import { Button } from '@nextui-org/react'
import EditIcon from '../Icons/EditIcon.jsx'
import ActiveIcon from '../Icons/ActiveIcon.jsx'
import CloseIcon from '../Icons/CloseIcon.jsx'
import CardChipStatus from './CardChipStatus.jsx'

export default function CardMenu (props) {
  const { 
    itemId,
    handleclickDelete, 
    isActive, 
    textModalDelete,
    modalHeaderText,
    updateForm } = props
  

  return (
    <div className='absolute z-10 flex justify-between w-full p-1'>
      {
        isActive 
          ? <CardChipStatus 
              startContentIcon={<ActiveIcon/>} 
              text='Activo' 
              color='success'
            />
          : <CardChipStatus 
              startContentIcon={<CloseIcon/>} 
              text='Inactivo' 
              color='danger'
            />
      }
      <div className='flex flex-col gap-2'>
        <CustomModal
          btnText='Editar' 
          headerText={modalHeaderText}
          btnOpen={
            <Button 
              className='px-0 min-w-unit-10' 
              color='warning'
              startContent={<EditIcon/>}
            />
          }

        >

          { updateForm }
          
        </CustomModal>

        {

          isActive
            && <ConfirmDeleteModal 
                  itemId={itemId}
                  text={textModalDelete} 
                  handleclickDelete={handleclickDelete}
                />

        }

      </div>
    </div>
      
  )
}