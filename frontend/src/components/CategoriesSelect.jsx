import { Select, SelectItem } from "@nextui-org/react";
import useListCategories from "../hooks/useListCategories";

export default function CategoriesSelect ({ placeholder, className }) {
  const [ categories, isLoading ] = useListCategories()


  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <Select
      isRequired
      label="Categoria"
      placeholder={placeholder}
      className={className}
      isLoading={isLoading}
      name="category_id"
    >
      {categories.map((cat) => (
        <SelectItem 
        key={cat.id} 
        value={cat.id}
        onChange={handleChange}
      >
          {cat.name}
        </SelectItem>
      ))}
    </Select>
  )
}