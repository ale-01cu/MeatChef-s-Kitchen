import CardMenu from "./CardMenu"
import UpdateCourseForm from "../Course/UpdateCourseForm.jsx"
import useAuth from '../../hooks/useAuth.jsx'

export default function CardMenuCourse(props) {
  const { 
    itemId,
    handleclickDelete, 
    isActive, 
    textModalDelete,
    deleteIsError, 
    isLoadingDelete,
    refreshOneElement } = props
  const { user } = useAuth()
  
  if(!user || !user.is_teacher) return null
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