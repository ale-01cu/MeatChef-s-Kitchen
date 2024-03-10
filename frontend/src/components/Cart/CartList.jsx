import useCart from "../../hooks/useCart"
import Card from '../Card'
import { Image, Input } from "@nextui-org/react"
import { Link } from "wouter"
import { BASE_URL } from "../../utils/constants"
import ConfirmDeleteModal from "../ConfirmDeleteModal"

export default function CartList() {
  const { cart } = useCart()

  if(!cart) return <h1>El carrito esta vacio</h1>
  return (
    <ul className="grid justify-items-center xl:justify-items-stretch grid-cols-1 lg:grid-cols-2 xl2:grid-cols-3 gap-2">
      {
        cart.map((prod) => (
          <li key={prod.id} className="max-w-[445px] xl:max-w-none p-4 bg-white rounded-xl flex justify-center items-center">
            <div className="flex gap-x-4">
              <div className="flex justify-center items-center">
                <Image
                  src={BASE_URL + '/' + prod.photo}
                  alt="meat"
                  classNames={{
                    img: 'max-w-[200px] object-cover aspect-video'
                  }} 
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h3 className="text-lg font-semibold text-black">
                  {prod.name_of_the_cut_of_meat}
                </h3>
                <Input
                  label="Cantidad"
                  name="amount"
                  type="number"
                  placeholder="Cantidad"
                />
                <ConfirmDeleteModal/>
              </div>

            </div>
            
          </li>
        ))
      }
    </ul>
  )
}