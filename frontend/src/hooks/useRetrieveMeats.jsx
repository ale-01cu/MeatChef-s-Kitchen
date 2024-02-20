import { useEffect, useState } from "react"
import { retrieveMeats } from "../services/meats" 

export default function useRetrieveMeats(id) {
  const [ item, setItem ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
      setIsLoading(true)
      retrieveMeats(id).then(data => {
        setItem(data)
        setIsLoading(false)
      })
  }, [id])

  return [item, isLoading]
}