import CategoryParent from "../Category/CategoryParent"
import OrderManageMenu from "../OrderManage/OrderManageMenu"
import AddMeatFormModal from "./AddMeatFormModal"
import useRoles from "../../hooks/useRoles"
import React from "react"

function MeatMenuComponent({ setRefreshComponent, category_id }) {
  const { isSuperUser, isClientOrAny } = useRoles()

  return (
    <div className="flex w-full justify-center p-5 px-8">
      <div className={`${ isSuperUser ? 'w-1/4' : '' }`}>
        <OrderManageMenu/>
      </div>
      <div className={`flex justify-end items-center gap-x-2 ${isClientOrAny ? 'w-full' : ''}  ${ isSuperUser ? 'w-3/4' : '' }`}>
        <AddMeatFormModal setRefreshComponent={setRefreshComponent}/>
        <CategoryParent categoryId={category_id}/>
      </div>
    </div>
  )
}

const MeatMenu = React.memo(MeatMenuComponent)
export default MeatMenu