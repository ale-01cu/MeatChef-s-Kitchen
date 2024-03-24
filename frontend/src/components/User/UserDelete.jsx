import ConfirmDeleteModal from "../ConfirmDeleteModal"
import { deleteUser } from "../../services/user";

export default function UserDelete({ itemId, setUsers }) {
  
  const handleDelete = (_, onClose, setIsLoadingDelete, setDeleteIsError) => {
    deleteUser(itemId)
      .then(() => {
        onClose()
        setUsers(prev => prev.map(user => {
          if(user.id === itemId) {
            const newUser = {
              ...user,
              is_active: false
            }
            return newUser
          }
          return user
        }))
      })
      .catch((e) => {
        console.error(e);
        setDeleteIsError(e)
      })
      .finally(() => {
        setIsLoadingDelete(false)
      })
  }
  
  return (
    <ConfirmDeleteModal
      itemId={itemId}
      text='Esta Seguro de que Desea Eliminar al usuario ?'
      handleclickDelete={handleDelete}
      btnText='a'
    />
  )
}