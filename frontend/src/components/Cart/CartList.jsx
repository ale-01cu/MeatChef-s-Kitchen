import useCart from "../../hooks/useCart"
import { Image, Input } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import { updateAmountCart } from "../../services/cart"

export default function CartList() {
  const { cart, deleteProduct } = useCart()

  const handleChangeAmount = (id, value) => {
    updateAmountCart(id, value)
  }

  const handelDelete = (id) => {
    deleteProduct(id)
  }

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
                  onChange={(e) => handleChangeAmount(prod.id, e.target.value)}
                  defaultValue={prod.amount}
                  variant="bordered"
                  classNames={{
                    label: 'group-data-[filled-within=true]:text-black',
                    input: 'text-black'
                  }}
                />
                <div className="self-end">
                  <ConfirmDeleteModal 
                    text='Desea eliminar el producto del carrito ?'
                    handleclickDelete={() => handelDelete(prod.id)}
                  />
                </div>
              </div>

            </div>
            
          </li>
        ))
      }
    </ul>
  )
}