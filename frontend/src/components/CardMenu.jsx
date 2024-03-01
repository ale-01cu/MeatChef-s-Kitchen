import ConfirmDeleteModal from "./ConfirmDeleteModal"

export default function CardMenu (props) {
  const { 
    itemId,
    handleclickDelete, 
    courseIsActive, 
    textModalDelete,
    children,
    deleteIsError, 
    isLoadingDelete } = props
  
  return (
    <>
      { children }

      {

        courseIsActive
          && <ConfirmDeleteModal 
          itemId={itemId}
          text={textModalDelete} 
          handleclickDelete={handleclickDelete}
          deleteIsError={deleteIsError}
          isLoadingDelete={isLoadingDelete}
        />

      }
    
    </>
  )
}