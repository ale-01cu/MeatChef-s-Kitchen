import { Link } from "wouter"
import AuthButtons from './Auth/AuthButtons'
import Search from "./Search"
import { Image } from "@nextui-org/react"
import CartButton from "./Cart/CartButton"
import BtnCustomOrder from "./CustomOrder/BtnCustomOrder"

export default function Header({typeSearch, children, options}) {
  
  return (
    <>
      <header className="p-5 px-8 py-6 flex justify-between items-center">
        <div className="flex gap-x-5 justify-center items-center">
          <Link to="/">
            <Image
              src={typeSearch === 'cursos' ? "/Imagen4.png" : '/Recurso 3.png'}
              alt="Logo"
              width={typeSearch === 'cursos' ? 200 : 50}
            />
          </Link>
          {
            typeSearch === 'carnicos' 
              && <Search type={typeSearch}/>
          }
        </div>

          {
            typeSearch === 'cursos' 
              && <Search type={typeSearch}/>
          }

        <div className="flex justify-center items-center gap-x-2">
          <BtnCustomOrder/>
          <CartButton/>
          <AuthButtons/>
        </div>
      </header>
      
      <aside>
        { options }
      </aside>
    
      <main>
        { children }
      </main>
    </>
  )
}