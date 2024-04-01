import { Select, SelectItem } from "@nextui-org/react";
import useRoles from "../../hooks/useRoles";
import React from "react";

const NONE_SELECTED_VALUE = 'NONE'

function CategoriesSelectComponent (props) {
  const { 
    placeholder, 
    className, 
    categories, 
    isLoading, 
    defaultValue, 
    isInvalid,
    errorMessage,
    handleChange } = props
  const { isSuperUser } = useRoles()

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

const CategoriesSelect = React.memo(CategoriesSelectComponent)
export default CategoriesSelect