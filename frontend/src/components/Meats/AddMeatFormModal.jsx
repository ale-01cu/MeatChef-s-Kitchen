import CustomModal from "../Modals/CustomModal"
import AddMeatForm from "./AddMeatForm"
import useRoles from "../../hooks/useRoles"

export default function AddMeatFormModal({ setRefreshComponent }) {
  const { isSuperUser } = useRoles()

  if(!isSuperUser) return null
  return (
    <CustomModal
      btnText='Nuevo Producto'
      headerText='Nuevo Producto'
    >
        <AddMeatForm refreshParent={setRefreshComponent}/>
    </CustomModal>
  )
}