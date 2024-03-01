import ListMeats from "../components/ListMeats"
import Header from "../components/Header"
import NavCategories from "../components/NavCategories"
import { useParams } from "wouter"
import { listMeats, listSearchMeats, listMeatsByCategory, retrieveMeats } from "../services/meats"
import { useEffect, useState } from "react"
import AddMeatForm from "../components/Meats/AddMeatForm"
import CustomModal from "../components/CustomModal"
import useAuth from "../hooks/useAuth"
import CategoriesSelect from "../components/CategoriesSelect"

export default function Meats() {
  const { user } = useAuth()
  const { category_id, search } = useParams()
  const [ meatData, setMeatsData ] = useState([])
  const [ refreshComponent, setRefreshComponent ] = useState(0)
  const [ isError, setIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  const reRenderOneElement = (meatId) => {
    retrieveMeats(meatId)
      .then((data) => {

        const newMeatData = meatData.map((course) => {
          if(course.id === meatId) return data
          else return course
        })

        setMeatsData([
          ...newMeatData
        ])

      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    setIsLoading(true)
    if(search){
      listSearchMeats(search)
        .then(data => setMeatsData(data))
        .catch(e => {
          console.error(e)
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
        
    }else if(category_id) {
      listMeatsByCategory(category_id)
        .then(data => setMeatsData(data))
        .catch(e => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => setIsLoading(false))

    }else {
      listMeats()
        .then(data => setMeatsData(data))
        .catch(e => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
    }
  }, [search, category_id, refreshComponent])

  return (
    <>
      <Header typeSearch='carnicos'/>
      <CategoriesSelect placeholder='Filtrar por Categoria'/>
      <main>
        {
          !isError && search && <div>
            <h1>Resultados de la Busqueda</h1>
          </div>
        }

        <div>
          {
            !isError && search && meatData.length === 0 
              && <h1>No se encontraron resultados.</h1>
          }
        </div>

        {
          user?.is_staff 
            && <CustomModal
              btnText='Agregar Nuevo Producto'
              headerText='Nuevo Producto'
            >
              <AddMeatForm refreshParent={setRefreshComponent}/>
            </CustomModal>
        }

        {
          !search && meatData.length === 0 && !isError && !isLoading
            && <h1>No hay Cursos</h1>
        }

        {
          meatData.length > 0 && !isError && !isLoading
            && <ListMeats data={meatData}/>
        }

        {
          isLoading && <h1>Cargando</h1>
        }

        {
          isError &&
            <h1>Exploto esta talla</h1>
        }
      </main>
    </>
  )
}