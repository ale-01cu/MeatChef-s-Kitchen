import CustomModal from '../Modals/CustomModal'
import AddUsersForm from './AddUsersForm'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../Icons/Plusicon'

export default function AddUsersModal({ setUsers }) {
  return (
    <CustomModal
      headerText='Nuevo Usuario'
      btnOpen={(
        <Button
          className="bg-foreground text-background"
          endContent={<PlusIcon />}
          size="sm"
        >
          Agregar Nuevo
        </Button>
      )}
    >
        <AddUsersForm setUsers={setUsers}/>
    </CustomModal>
  )
}