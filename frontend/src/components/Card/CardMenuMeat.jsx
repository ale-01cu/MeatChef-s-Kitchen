import CardMenu from "./CardMenu"
import UpdateMeatForm from "../Meats/UpdateMeatForm"
import useAuth from "../../hooks/useAuth"

export default function CardMenuMeat(props) {
  const { 
    itemId,
    handleclickDelete, 
    isActive, 
    textModalDelete,
    deleteIsError, 
    isLoadingDelete,
    refreshOneElement } = props
  const { user } = useAuth()
  
  if(!user || !user.is_superuser) return null
  return <CardMenu
          itemId={itemId}
          isActive={isActive}
          handleclickDelete={handleclickDelete}
          textModalDelete={textModalDelete}
          deleteIsError={deleteIsError}
          isLoadingDelete={isLoadingDelete}
          refreshOneElement={refreshOneElement}
          modalHeaderText='Editar Producto'
          updateForm={          
            <UpdateMeatForm 
              meatId={itemId}
              refreshOneElement={refreshOneElement}
            />
          }
        />
}