import CustomModal from "./CustomModal"
import AddMeatForm from "./Meats/AddMeatForm"
import CategoryParent from "./Category/CategoryParent"
import useAuth from "../hooks/useAuth"

export default function MeatMenu({ setRefreshComponent, category_id }) {
  const { user } = useAuth()

  if(!user) return null
  return (
    <div className="flex w-full justify-end items-center px-5 gap-x-2">
      {
        user?.is_superuser 
          && <CustomModal
                btnText='Nuevo Producto'
                headerText='Nuevo Producto'
              >
                  <AddMeatForm refreshParent={setRefreshComponent}/>
              </CustomModal>
      }
      
      <CategoryParent 
        user={user} 
        categoryId={category_id}
      />

    </div>
  )
}