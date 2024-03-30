import { Select, SelectItem } from "@nextui-org/react";
import { useLocation } from "wouter";
import useRoles from "../../hooks/useRoles";
import { useCallback } from "react";

const NONE_SELECTED_VALUE = 'NONE'
const LOCATIONS = {
  form: 'FORM'
}

export default function CategoriesSelect (props) {
  const { 
    placeholder, 
    className, 
    categories, 
    isLoading, 
    defaultValue, 
    location,
    isInvalid,
    errorMessage } = props
  const [ _, navegate ] = useLocation()
  const { isSuperUser } = useRoles()

  const handleChange = useCallback((e) => {
    if(!(location === LOCATIONS.form)) {
      const categoryId = e.target.value
      if(categoryId !== NONE_SELECTED_VALUE) 
        navegate('/carnicos/category/' + categoryId)
      else navegate('/carnicos')
    }
  }, [location, navegate])

  if( !isSuperUser ) return null
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
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    
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