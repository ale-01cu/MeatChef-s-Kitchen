import CardNextUi from "../Card/CardNextUi"
import { Link } from "wouter"
import { useEffect, useState } from "react"
import { listLastMeats } from "../../services/meats"
import HomeListsSkeleton from "../Skeletons/HomeListsSkeleton"

export default function LastMeatList() {
  const [ lastMeats, setLastMeats ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    listLastMeats()
      .then((data) => {
        setLastMeats(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if(isLoading) return <HomeListsSkeleton/>
  return (
    <>
      <h1 className="p-8 text-2xl font-bold text-center">
        Nuestros Ultimos Productos.
      </h1>
      <ul className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-wrap md:flex-row justify-center items-center gap-4">
        {
          lastMeats.map((meat) => (
            <li key={meat.id} className="relative flex">
              <CardNextUi
                id={meat.id}
                alt={meat.name}
                image={meat.photo}
                title={meat.name_of_the_cut_of_meat}
                to={'/carnicos/' + meat.id}
              />
            </li>
          ))
        }
      </ul>
      <div className="flex justify-center pt-12">
        <Link
          to="/carnicos"
          className="p-3 bg-default-200 rounded-xl"
        >
          Ver Mas
        </Link>
      </div>
    </>
  )
}