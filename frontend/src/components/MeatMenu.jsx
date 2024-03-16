import CategoryParent from "./Category/CategoryParent"
import OrderManageMenu from "./OrderManage/OrderManageMenu"
import AddMeatFormModal from "./Meats/AddMeatFormModal"
import useRoles from "../hooks/useRoles"

export default function MeatMenu({ setRefreshComponent, category_id }) {
  const { isAuthenticated, isSuperUser, isClient } = useRoles()

  if(!isAuthenticated) return null
  return (
    <div className="flex w-full justify-center p-5">
      <div className={`${ isSuperUser ? 'w-1/4' : '' }`}>
        <OrderManageMenu/>
      </div>
      <div className={`flex justify-end items-center gap-x-2 ${isClient ? 'w-full' : ''}  ${ isSuperUser ? 'w-3/4' : '' }`}>
        <AddMeatFormModal setRefreshComponent={setRefreshComponent}/>
        <CategoryParent categoryId={category_id}/>
      </div>
    </div>
  )
}