import ListMeats from "../components/Meats/ListMeats"
import { useParams } from "wouter"
import { listMeats, listSearchMeats, listMeatsByCategory, retrieveMeats } from "../services/meats"
import { useCallback, useEffect, useState } from "react"
import MeatMenu from "../components/Meats/MeatMenu"
import CardMenuMeat from "../components/Card/CardMenuMeat"
import { deleteMeat } from "../services/meats"
import { Spinner } from "@nextui-org/react"
import GeneralError from "../components/Errors/GeneralError"

export default function Meats() {
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

  const handleclickDelete = useCallback((meatId, onClose, setIsLoadingDelete, setDeleteIsError) => {
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
  }, [meatData])

  const reRenderOneElement = useCallback((meatId) => {
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
  }, [meatData])

  if(isLoading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
  if(isError) return <GeneralError/>
  return (
    <>
      <MeatMenu
        setRefreshComponent={setRefreshComponent}
        category_id={category_id}
      />

      <div className="sm:p-10 flex flex-col gap-y-16 min-h-screen">

        {
          !isError && search && <div>
            <h1 className="text-4xl font-extrabold text-center p-2">
              Resultados de la Busqueda
            </h1>
          </div>
        }

        {
          !isError && search && meatData.length === 0 
            &&  <div>
                  <h1 className="text-center text-pretty">
                    No se encontraron resultados.
                  </h1>
                </div>
        }

        {
          !search && meatData.length === 0 && !isError && !isLoading
            && <h1 className="text-2xl font-bold text-center">
                No hay Carnes para mostrar
              </h1>
        }

        <div className='py-8 space-y-4'>

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

        </div>
      </div>

    </>
  )
}