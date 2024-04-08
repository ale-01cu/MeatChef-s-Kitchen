import React from 'react'
import CustomModal from "../Modals/CustomModal"
import { listBiggestBuyers, getMostSelledProduct } from "../../services/sales"
import { useEffect, useState } from "react"
import CardNextUi from '../Card/CardNextUi'
import useRoles from '../../hooks/useRoles'

function SalesModal() {
  const [ product, setProduct ] = useState({})
  const [ buyers, setBuyers ] = useState([])
  const { isSuperUser } = useRoles()

  useEffect(() => {
    getMostSelledProduct()
      .then((data) => {
        setProduct(data)
      })
  }, [])

  useEffect(() => {
    listBiggestBuyers()
      .then((data) => {
        setBuyers(data)
      })
  }, [])

  if(!isSuperUser || isSuperUser === undefined) return null
  return (
    <CustomModal
      size='3xl'
      btnOpen={<span className="cursor-pointer">Ventas</span>}
      headerText='Estadisticas de Ventas'
    >
      <div className="flex gap-x-12 justify-center">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold">Producto Mas Vendido</h1>
          {
            product && (
              <div className="py-2">
                <CardNextUi
                  alt={product.name_of_the_cut_of_meat}
                  id={product.id}
                  image={product.photo}
                  title={product.name_of_the_cut_of_meat}
                  to={'/carnicos/' + product.id}
                />
              </div>
            )
          }
        </div>

        <div>
          <h1 className="text-xl font-bold">Mayores Compradores</h1>
          {
            buyers.length > 0 && (
              <ul className="flex gap-y-2 flex-col py-8">
                {
                  buyers.map((buyer) => (
                    <li key={buyer.user.id} className="p-4 bg-gray-800 rounded-xl flex gap-x-2">
                      <span>{buyer.user.email}</span>
                      <span>{buyer.total_amount}</span>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
    </CustomModal>
  )
}

const SalesModalMemo = React.memo(SalesModal)
export default SalesModalMemo