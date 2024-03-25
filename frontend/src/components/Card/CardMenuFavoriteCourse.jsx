import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal"

export default function CardMenuFavoriteCourse(props) {
  const { 
    itemId, 
    textModalDelete, 
    handleclickDelete, 
    deleteIsError,
    isLoadingDelete } = props

  return (
    <div className="absolute z-10 flex justify-end w-full p-1">
      <ConfirmDeleteModal
        itemId={itemId}
        text={textModalDelete} 
        handleclickDelete={handleclickDelete}
        deleteIsError={deleteIsError}
        isLoadingDelete={isLoadingDelete}
      />
    </div>
  )
}