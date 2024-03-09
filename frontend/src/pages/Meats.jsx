import ListMeats from "../components/Meats/ListMeats"
import { useParams } from "wouter"
import { listMeats, listSearchMeats, listMeatsByCategory, retrieveMeats } from "../services/meats"
import { useEffect, useState } from "react"
import AddMeatForm from "../components/Meats/AddMeatForm"
import CustomModal from "../components/CustomModal"
import useAuth from "../hooks/useAuth"
import CategoryParent from "../components/Category/CategoryParent"
import MeatSlider from "../components/Meats/MeatSlider"

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
        .then(data => {
          setMeatsData(data)
        })
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

      <div className="flex w-full justify-end items-center px-5 gap-x-2">
        {
          user?.is_superuser 
          && <CustomModal
          btnText='Nuevo Producto'
          headerText='Nuevo Producto'
          >
              <AddMeatForm refreshParent={setRefreshComponent}/>
            </CustomModal>
        }
        <CategoryParent user={user} categoryId={category_id}/>

      </div>


      <div className="p-10 flex flex-col gap-y-16">
        { !isError && !search && !category_id && !isLoading && !user?.is_superuser && <MeatSlider/> }

        {
          !isError && search && <div>
            <h1 className="text-4xl font-extrabold text-center p-2">Resultados de la Busqueda</h1>
          </div>
        }

        {
          !isError && search && meatData.length === 0 
            && <div><h1 className="text-center text-pretty">No se encontraron resultados.</h1></div>
        }

        {
          !search && meatData.length === 0 && !isError && !isLoading
            && <h1>No hay Cursos</h1>
        }

        {
          !isLoading && !isError && !search && !category_id
            && <h5 className="text-xl font-semibold text-center">
              Compra Online la mejor seleccion de carne.
            </h5>
        }

        {
          meatData.length > 0 && !isError && !isLoading
            && <ListMeats 
              data={meatData} 
              user={user} 
              refreshParent={setRefreshComponent}
              refreshOneElement={reRenderOneElement}
            />
        }

        {
          isLoading && <h1>Cargando</h1>
        }

        {
          isError &&
            <h1>Exploto esta talla</h1>
        }
      </div>
    </>
  )
}