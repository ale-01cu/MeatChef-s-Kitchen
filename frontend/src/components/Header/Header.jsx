import { Link } from "wouter"
import AuthButtons from '../Auth/AuthButtons'
import Search from "../Search/Search"
import { Image } from "@nextui-org/react"
import CartButton from "../Cart/CartButton"
import BtnCustomOrder from "../CustomOrder/BtnCustomOrder"
import MyOrdersButton from "../Order/MyOrdersButton"
import BtnFavorite from "../Favorite/BtnFavorite"
import React, { useMemo } from "react"
import CourseLink from "./CoursesLink"
import UsersLink from "./UsersLink"
import SalesModal from "../Sales/SalesModal"

function HeaderComponent({ typeSearch }) {

  const src = useMemo(() => (
    typeSearch === 'cursos' 
      ? "/Imagen4.png" 
      : '/Recurso 3.png'
  ), [typeSearch])

  const width = useMemo(() => (
    typeSearch === 'cursos' 
      ? 150
      : 50
  ), [typeSearch])

  return (
    <>
      <div className="p-5 px-8 py-6 flex justify-between items-center">
        <div className="flex gap-x-5 justify-center items-center">
          <Link to="/">
            <img
              src={src}
              alt="Logo"
              width={width}
              className="min-w-[50px] rounded-2xl"
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
            <CourseLink/>
            <UsersLink/>
            <SalesModal/>
 
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

const Header = React.memo(HeaderComponent)
export default Header