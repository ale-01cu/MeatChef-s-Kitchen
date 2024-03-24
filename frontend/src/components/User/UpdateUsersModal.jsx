import CustomModal from '../CustomModal'
import { Button } from '@nextui-org/react'
import EditIcon from '../Icons/EditIcon'
import UpdateUsersForm from './UpdateUsersForm'

export default function UpdateUsersModal({ userId, setUsers }) {
  return (
    <CustomModal
      headerText='Editar Usuario'
      btnOpen={
        <Button 
          className='px-0 min-w-unit-10 hover:scale-110' 
          color='warning'
          variant='light'
          startContent={<EditIcon/>}
        />
      }
    >
        <UpdateUsersForm setUsers={setUsers} userId={userId}/>
    </CustomModal>
  )
}