import { useEffect, useState } from "react"
import { listCategories } from "../services/categories"

export default function useListCategories() {
  const [ items, setItems ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    listCategories()
      .then(data => setItems(data))
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  return { 
    categories: items, 
    isLoading, 
    setIsLoading,
    setCategories: setItems 
  }
}