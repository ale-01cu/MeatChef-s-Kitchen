import CategoriesSelect from "./CategoriesSelect"
import CustomModal from "../Modals/CustomModal"
import CategoryForm from "./CategoryForm"
import BtnAddCategory from "./BtnAddCategory"
import useListCategories from "../../hooks/useListCategories"
import CategoryList from "./CategoryList"
import useRoles from "../../hooks/useRoles"
import { useLocation } from "wouter"
import React, { useCallback } from "react"

function CategoryParentComponent({ categoryId }) {
  const { 
    categories, 
    isLoading, 
    setCategories 
  } = useListCategories()
  const { isClientOrAny, isSuperUser } = useRoles()
  const [ _, navegate ] = useLocation()

  const handleChange = useCallback((e) => {
      const categoryId = e.target.value
      if(categoryId !== 'NONE') 
        navegate('/carnicos/category/' + categoryId)
      else navegate('/carnicos')
  }, [navegate])

  if(isClientOrAny) 
    return <CategoryList categories={categories}/>
  return (
    <>
      <CategoriesSelect 
        className='max-w-xs' 
        placeholder='Filtrar por Categoria'
        categories={categories}
        isLoading={isLoading}
        defaultValue={categoryId}
        handleChange={handleChange}
      />
      
      {
        isSuperUser
          && <CustomModal
              btnOpen={<BtnAddCategory/>}
              headerText='Nueva Categoria'
            >
              <CategoryForm setCategories={setCategories}/>
            </CustomModal>
      }
    </>
  )
}

const CategoryParent = React.memo(CategoryParentComponent)
export default CategoryParent