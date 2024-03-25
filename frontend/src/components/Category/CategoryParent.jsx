import CategoriesSelect from "./CategoriesSelect"
import CustomModal from "../Modals/CustomModal"
import CategoryForm from "./CategoryForm"
import BtnAddCategory from "./BtnAddCategory"
import useListCategories from "../../hooks/useListCategories"
import CategoryList from "./CategoryList"
import useRoles from "../../hooks/useRoles"

export default function CategoryParent({ categoryId, location }) {
  const { 
    categories, 
    isLoading, 
    setCategories 
  } = useListCategories()
  const { isClientOrAny, isSuperUser } = useRoles()

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
        location={location}
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