import { useEffect, useState } from "react"
import { listMeats } from "../services/meats"

export default function useListMeats() {
  const [ items, setItems ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
      setIsLoading(true)
      listMeats().then(data => {
        setItems(data)
        setIsLoading(false)
      })
  }, [])

  return [items, isLoading]
}