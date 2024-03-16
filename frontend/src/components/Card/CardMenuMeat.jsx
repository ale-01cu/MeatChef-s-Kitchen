import CardMenu from "./CardMenu"
import UpdateMeatForm from "../Meats/UpdateMeatForm"
import useRoles from "../../hooks/useRoles"

export default function CardMenuMeat(props) {
  const { 
    itemId,
    handleclickDelete, 
    isActive, 
    textModalDelete,
    deleteIsError, 
    isLoadingDelete,
    refreshOneElement } = props
    const { isSuperUser } = useRoles()

  if(isSuperUser) return null
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