import React, { useMemo } from "react";
import {
    Navbar, 
    NavbarMenuToggle, 
    NavbarMenu, 
    NavbarContent, 
    NavbarMenuItem } from "@nextui-org/react";
import Search from "../Search/Search";
import { Link } from "wouter";
import CourseLink from "./CoursesLink";
import UsersLink from "./UsersLink";
import SalesModal from '../Sales/SalesModal'
import BtnFavorite from "../Favorite/BtnFavorite";
import MyOrdersButton from "../Order/MyOrdersButton";
import BtnCustomOrder from "../CustomOrder/BtnCustomOrder";
import CartButton from "../Cart/CartButton";
import MeatLink from "./MeatLink";

export default function HeaderNextUiResponsive({ typeSearch }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = useMemo(() => ([
    {
      id: 'Inicio',
      component: Link,
      props: { to: '/' }
    },
    {
      id: 'Carnes',
      component: MeatLink,
      props: {}
    },
    {
      id: 'Course',
      component: CourseLink,
      props: {}
    },
    {
      id: 'Users',
      component: UsersLink,
      props: {}
    },
    {
      id: 'Sales',
      component: SalesModal,
      props: {}
    },
    {
      id: 'Favorite Courses',
      component: BtnFavorite,
      props: { typeSearch }
    },
    {
      id: 'Favorite Courses',
      component: MyOrdersButton,
      props: { typeSearch }
    },
    {
      id: 'Favorite Courses',
      component: BtnCustomOrder,
      props: { typeSearch }
    },
    {
      id: 'Favorite Courses',
      component: CartButton,
      props: { typeSearch }
    },

  ]), [typeSearch])

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="lg:hidden bg-transparent"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <Search type={typeSearch}/>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            <item.component {...item.props}>
              {item.id}
            </item.component>

          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
