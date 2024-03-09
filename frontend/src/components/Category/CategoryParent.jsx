import CategoriesSelect from "./CategoriesSelect"
import CustomModal from "../CustomModal"
import CategoryForm from "./CategoryForm"
import BtnAddCategory from "./BtnAddCategory"
import useListCategories from "../../hooks/useListCategories"

export default function CategoryParent({ user, setMeatsData }) {
  const { 
    categories, 
    isLoading, 
    setCategories 
  } = useListCategories()

  return (
    <>
      <CategoriesSelect 
        className='max-w-xs' 
        placeholder='Filtrar por Categoria'
        categories={categories}
        isLoading={isLoading}
      />
      
      {
        user?.is_superuser 
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