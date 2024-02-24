import ListMeats from "../components/ListMeats"
import Header from "../components/Header"
import NavCategories from "../components/NavCategories"
import { useParams } from "wouter"
import { listMeats, listSearchMeats } from "../services/meats"
import { useEffect, useState } from "react"

export default function Meats() {
  const { category, search } = useParams()
  const [ meatData, setMeatsData ] = useState([])
  
  useEffect(() => {
    if(search){
      listSearchMeats(search)
        .then(data => setMeatsData(data))
    }else if(category) {
      setMeatsData([])
    }else {
      listMeats()
        .then(data => setMeatsData(data))
    }
  }, [search, category])

  return (
    <>
      <Header typeSearch='carnicos'/>
      <NavCategories/>
      <main>
        {
          search && meatData.length === 0 
            ? <h1>No se encontraron resultados.</h1>
            : <h1>Resultados de la busqueda</h1> 
        }
        <ListMeats data={meatData}/>
      </main>
    </>
  )
}