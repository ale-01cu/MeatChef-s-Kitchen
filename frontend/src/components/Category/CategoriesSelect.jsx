import { Select, SelectItem } from "@nextui-org/react";
import { useLocation } from "wouter";
const NONE_SELECTED_VALUE = 'NONE'

export default function CategoriesSelect (props) {
  const { 
    placeholder, 
    className, 
    categories, 
    isLoading, 
    defaultValue } = props
  const [ _, navegate ] = useLocation()
  

  const handleChange = (e) => {
    if(!defaultValue ) {
      const categoryId = e.target.value
      if(categoryId !== NONE_SELECTED_VALUE) 
        navegate('/carnicos/category/' + categoryId)
      else navegate('/carnicos')
    }
  }

  return (
    <Select
      isRequired
      variant="faded"
      aria-label="Filter Categories"
      labelPlacement="outside"
      placeholder={placeholder}
      className={className}
      isLoading={isLoading}
      name="category_id"
      defaultSelectedKeys={defaultValue ? [defaultValue] : null}
      onChange={handleChange}
      classNames={{
        trigger: 'py-0',
      }}
    >
      <SelectItem 
        key={NONE_SELECTED_VALUE} 
        value={NONE_SELECTED_VALUE}
      >
        Ninguna
      </SelectItem>
      {
        categories?.map((cat) => (
          <SelectItem 
            key={cat.id} 
            value={cat.id}
          >
            {cat.name}
          </SelectItem>
        ))
      }
    </Select>
  )
}