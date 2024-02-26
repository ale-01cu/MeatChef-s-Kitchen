import { useState } from "react"
import { useLocation } from "wouter" 
import { CLIENT_BASE_URL } from "../utils/constants"

export default function Search({type}) {
  const [ searchValue, setSearchValue ] = useState('')
  const [_, setLocation] = useLocation()

  const handelChange = (e) => {
    setSearchValue(e.target.value)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(searchValue) setLocation(CLIENT_BASE_URL + '/' + type + '/search/' + searchValue)
  
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input 
          type="search" 
          name="search"
          value={searchValue} 
          onChange={handelChange}
          id="search" 
          placeholder="Buscar..."
        />

      </form>
    </div>
  )
}