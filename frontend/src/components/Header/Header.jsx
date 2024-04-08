import AuthButtons from '../Auth/AuthButtons'
import Search from "../Search/Search"
import CartButton from "../Cart/CartButton"
import BtnCustomOrder from "../CustomOrder/BtnCustomOrder"
import MyOrdersButton from "../Order/MyOrdersButton"
import BtnFavorite from "../Favorite/BtnFavorite"
import React from "react"
import CourseLink from "./CoursesLink"
import UsersLink from "./UsersLink"
import SalesModal from "../Sales/SalesModal"
import HomeLink from "./HomeLink"
import MeatLink from "./MeatLink"

function HeaderComponent({ typeSearch }) {

  return (
    <>
      <div className="hidden lg:flex p-5 px-8 py-6 justify-between items-center">
        <div className="flex gap-x-5 justify-center items-center">
          <HomeLink typeSearch={typeSearch}/>
          <Search type={typeSearch}/>
        </div>


        <div className="flex justify-center items-center gap-x-8">
          <div className="flex justify-center items-center gap-x-5">
            <MeatLink/>
            <CourseLink/>
            <UsersLink/>
            <SalesModal/>
            <BtnFavorite typeSearch={typeSearch}/>
            <MyOrdersButton typeSearch={typeSearch}/>
            <BtnCustomOrder typeSearch={typeSearch}/>
            <CartButton typeSearch={typeSearch}/>

          </div>

          <AuthButtons/>
        </div>
        
      </div>

    </>
  )
}

const Header = React.memo(HeaderComponent)
export default Header