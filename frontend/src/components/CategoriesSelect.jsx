import { Select, SelectItem } from "@nextui-org/react";
import useListCategories from "../hooks/useListCategories";

export default function CategoriesSelect ({ placeholder }) {
  const [ categories, isLoading ] = useListCategories()

  return (
    <Select
      isRequired
      label="Categoria"
      placeholder={placeholder}
      className="max-w-xs"
      isLoading={isLoading}
      name="category_id"
    >
      {categories.map((cat) => (
        <SelectItem key={cat.id} value={cat.id}>
          {cat.name}
        </SelectItem>
      ))}
    </Select>
  )
}