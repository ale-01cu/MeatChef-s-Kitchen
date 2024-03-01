import ListMeats from "../components/ListMeats"
import Header from "../components/Header"
import NavCategories from "../components/NavCategories"
import { useParams } from "wouter"
import { listMeats, listSearchMeats, listMeatsByCategory } from "../services/meats"
import { useEffect, useState } from "react"

export default function Meats() {
  const { category_id, search } = useParams()
  const [ meatData, setMeatsData ] = useState([])
  
  useEffect(() => {
    if(search){
      listSearchMeats(search)
        .then(data => setMeatsData(data))
        
    }else if(category_id) {
      listMeatsByCategory(category_id)
        .then(data => setMeatsData(data))

    }else {
      listMeats()
        .then(data => setMeatsData(data))
    }
  }, [search, category_id])

  return (
    <>
      <Header typeSearch='carnicos'/>
      <NavCategories/>
      <main>
        {
          search && <div>
            <h1>Resultados de la Busqueda</h1>
          </div>
        }
        <div>
          {
            search && meatData.length === 0 
              && <h1>No se encontraron resultados.</h1>
          }
        </div>
        <ListMeats data={meatData}/>
      </main>
    </>
  )
}