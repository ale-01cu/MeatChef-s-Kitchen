import { Link } from "wouter"

export default function BtnCustomOrder() {
  return (
    <Link to="/orden-personalizada" className="text-black bg-warning-400 p-2 rounded-xl hover:bg-warning-500 hover:scale-105 transition">
      <span className="transtion">
        Pedido Personalizado
      </span>
    </Link>
  )
}