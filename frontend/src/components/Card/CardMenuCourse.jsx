import CardMenu from "./CardMenu"
import UpdateCourseForm from "../Course/UpdateCourseForm.jsx"
import useRoles from '../../hooks/useRoles.jsx'

export default function CardMenuCourse(props) {
  const { 
    itemId,
    handleclickDelete, 
    isActive, 
    textModalDelete,
    deleteIsError, 
    isLoadingDelete,
    refreshOneElement } = props
    const { isTeacher } = useRoles()
  
  if(isTeacher) return null
  return <CardMenu
          itemId={itemId}
          isActive={isActive}
          handleclickDelete={handleclickDelete}
          textModalDelete={textModalDelete}
          deleteIsError={deleteIsError}
          isLoadingDelete={isLoadingDelete}
          refreshOneElement={refreshOneElement}
          modalHeaderText='Editar Curso'
          updateForm={          
            <UpdateCourseForm 
              courseId={itemId}
              refreshOneElement={refreshOneElement}
            />
          }
        />
}