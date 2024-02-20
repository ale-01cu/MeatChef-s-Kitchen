import { useEffect, useState } from "react"
import { listCategories } from "../services/categories"

export default function useListCategories() {
  const [ items, setItems ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
      setIsLoading(true)
      listCategories().then(data => {
        setItems(data)
        setIsLoading(false)
      })
  }, [])

  return [items, isLoading]
}