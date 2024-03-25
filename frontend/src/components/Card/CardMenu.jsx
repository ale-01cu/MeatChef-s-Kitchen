import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal"
import CustomModal from '../Modals/CustomModal.jsx'
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
      <CardChipStatus 
        startContentIcon={isActive ? <ActiveIcon/> : <CloseIcon/>} 
        text={isActive ? 'Activo' : 'Inactivo'}
        color={isActive ? 'success' : 'danger'}
      />

      <div className='flex flex-col gap-2'>
        <CustomModal
          btnText='Editar' 
          headerText={modalHeaderText}
          btnOpen={
            <Button 
              className='px-0 min-w-unit-10 hover:scale-110' 
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