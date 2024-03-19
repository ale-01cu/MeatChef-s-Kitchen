import { Image, Input } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"
import ConfirmDeleteModal from "../ConfirmDeleteModal"

export default function CartCard({ prod, handleChangeAmount, handelDelete }) {
  return (
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
          defaultValue={prod?.amount ? prod.amount : 1}
          variant="bordered"
          min={1}
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
  )
}