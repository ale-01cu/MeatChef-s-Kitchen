import { useEffect, useState } from "react"
import { listCourses } from "../services/courses"

export default function useListCourses() {
  const [ items, setItems ] = useState()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
      setIsLoading(true)
      listCourses().then(data => {
        setItems(data)
        setIsLoading(false)
      })
  }, [])

  return [items, isLoading]
}