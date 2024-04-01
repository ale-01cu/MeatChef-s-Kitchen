import { updateAmountCart } from "../../services/cart"
import CartCard from "./CartCard"

export default function CartList({ cart, deleteProduct }) {

  const handleChangeAmount = (id, value) => {
    updateAmountCart(id, value)
  }

  const handelDelete = (id) => {
    deleteProduct(id)
  }

  if(!cart) return <h1 className="text-center text-2xl font-semibold">El carrito esta vacio</h1>
  return (
    <ul className="grid justify-items-center xl:justify-items-stretch grid-cols-1 lg:grid-cols-2 xl2:grid-cols-3 gap-2">
      {
        cart.map((prod) => (
          <li key={prod.id} className="max-w-[445px] xl:max-w-none p-4 bg-white rounded-xl flex justify-center items-center">
            <CartCard 
              prod={prod}
              handleChangeAmount={handleChangeAmount}
              handelDelete={handelDelete}
            />
          </li>
        ))
      }
    </ul>
  )
}