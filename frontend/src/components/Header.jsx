import { Link } from "wouter"
import AuthButtons from './Auth/AuthButtons'
import Search from "./Search"
import { Image } from "@nextui-org/react"
import CartButton from "./Cart/CartButton"
import BtnCustomOrder from "./CustomOrder/BtnCustomOrder"
import MyOrdersButton from "./Order/MyOrdersButton"
import BtnFavorite from "./Favorite/BtnFavorite"
import React from "react"

function Header({ typeSearch }) {
  return (
    <>
      <div className="p-5 px-8 py-6 flex justify-between items-center">
        <div className="flex gap-x-5 justify-center items-center">
          <Link to="/">
            <Image
              src={typeSearch === 'cursos' ? "/Imagen4.png" : '/Recurso 3.png'}
              alt="Logo"
              width={typeSearch === 'cursos' ? 200 : 50}
              className="min-w-[50px]"
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


        <div className="flex justify-center items-center gap-x-8">
          <div className="flex justify-center items-center gap-x-5">
            <Link to="/carnicos">
              Carnicos
            </Link>
            <Link to="/cursos">
              <Image src="/Imagen5.png" width={96} height={96}/>
            </Link>
            {
              typeSearch === 'cursos'
                ? <BtnFavorite/>
                : <>
                    <MyOrdersButton/>
                    <BtnCustomOrder/>
                    <CartButton/>
                  </>

            }

          </div>

          <AuthButtons/>
        </div>
        
      </div>

    </>
  )
}

export default React.memo(Header)