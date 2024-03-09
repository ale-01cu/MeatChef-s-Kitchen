import { useState } from "react"
import { useLocation } from "wouter" 
import { CLIENT_BASE_URL } from "../utils/constants"
import { Input } from "@nextui-org/react"
import SearchIcon from './Icons/SearchIcon'

export default function Search({type}) {
  const [ searchValue, setSearchValue ] = useState('')
  const [_, setLocation] = useLocation()

  const handelChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(searchValue) setLocation(CLIENT_BASE_URL + '/' + type + '/search/' + searchValue)
  
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <Input
          id="search" 
          name="search"
          value={searchValue} 
          onChange={handelChange}
          isClearable
          onClear={handleClear}
          radius="lg"
          className="w-[350px]"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "",
            inputWrapper: [
              'p-3',
              'h-[45px]',
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/80",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Buscar..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />

      </form>
    </div>
  )
}