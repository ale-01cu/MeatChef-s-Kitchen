import CustomModal from "../CustomModal"
import AddCourseForm from "./AddCourseForm"
import useAuth from "../../hooks/useAuth"

export default function CourseMenu({ setRefreshComponent }) {
  const { user } = useAuth()

  if(!user) return null
  return (
    <div className="px-10">
    
      {
        user?.is_teacher
        && <div className="w-full flex justify-end">
              <CustomModal
                btnText='Nuevo Curso'
                headerText='Crear Curso'
              >
                <AddCourseForm refreshParent={setRefreshComponent}/>
              </CustomModal>
            </div>
      }
    
    </div>
  )
}