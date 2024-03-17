import ListMeats from "../components/Meats/ListMeats"
import { useParams } from "wouter"
import { listMeats, listSearchMeats, listMeatsByCategory, retrieveMeats } from "../services/meats"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import MeatSlider from "../components/Meats/MeatSlider"
import MeatMenu from "../components/MeatMenu"
import CardMenuMeat from "../components/Card/CardMenuMeat"
import { deleteMeat } from "../services/meats"
import { BASE_URL } from "../utils/constants"

export default function Meats() {
  const { user } = useAuth()
  const { category_id, search } = useParams()
  const [ meatData, setMeatsData ] = useState([])
  const [ refreshComponent, setRefreshComponent ] = useState(0)
  const [ isError, setIsError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    if(search){
      listSearchMeats(search)
        .then(data => {
          setMeatsData(data)
          setIsError(null)
        })
        .catch(e => {
          console.error(e)
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
        
    }else if(category_id) {
      listMeatsByCategory(category_id)
        .then(data => {
          setMeatsData(data)
          setIsError(null)
        })
        .catch(e => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => setIsLoading(false))

    }else {
      listMeats()
        .then(data => {
          setMeatsData(data)
          setIsError(null)
        })
        .catch(e => {
          console.error(e);
          setIsError(e)
        })
        .finally(() => setIsLoading(false))
    }
  }, [search, category_id, refreshComponent])

  const handleclickDelete = (meatId, onClose, setIsLoadingDelete, setDeleteIsError) => {
    setIsLoadingDelete(true)
    deleteMeat(meatId)
      .then(() => {
        onClose()
        setMeatsData(meatData.map((meat) => {
          if(meat.id === meatId) meat.is_active = false
          return meat
        }))
      })
      .catch(e => {
        console.error(e)
        setDeleteIsError(e)
      })
      .finally(() => setIsLoadingDelete(false))
  }

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


  return (
    <>

      <MeatMenu
        setRefreshComponent={setRefreshComponent}
        category_id={category_id}
      />


      <div className="p-10 flex flex-col gap-y-16">
        { !isError && !search && !category_id && !isLoading && !user?.is_superuser 
            &&  <MeatSlider 
                  meatData={meatData.map((meat) => {
                    return {
                      ...meat,
                      photo: BASE_URL + '/' + meat.photo
                    }
                  })}
                /> 
        }

        {
          !isError && search && <div>
            <h1 className="text-4xl font-extrabold text-center p-2">
              Resultados de la Busqueda
            </h1>
          </div>
        }

        {
          !isError && search && meatData.length === 0 
            && <div><h1 className="text-center text-pretty">No se encontraron resultados.</h1></div>
        }

        {
          !search && meatData.length === 0 && !isError && !isLoading
            && <h1>No hay Carnes</h1>
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
                refreshOneElement={reRenderOneElement}
                CardMenu={CardMenuMeat}
                handleclickDelete={handleclickDelete}
                textModalDelete='Desea Eliminar el Producto ?.'
              />
        }

        { isLoading && <h1>Cargando</h1> }

        {
          isError &&
            <h1>Exploto esta talla</h1>
        }
      </div>
    </>
  )
}