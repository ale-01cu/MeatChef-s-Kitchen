import CategoriesSelect from "./CategoriesSelect"
import CustomModal from "../CustomModal"
import CategoryForm from "./CategoryForm"
import BtnAddCategory from "./BtnAddCategory"
import useListCategories from "../../hooks/useListCategories"
import CategoryList from "./CategoryList"

export default function CategoryParent({ user, categoryId, location }) {
  const { 
    categories, 
    isLoading, 
    setCategories 
  } = useListCategories()

  if(user && user.is_superuser) 
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
  else return <CategoryList categories={categories}/>
}