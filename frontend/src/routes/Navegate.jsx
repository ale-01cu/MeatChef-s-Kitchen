import { Switch, Route, Redirect } from "wouter"
import Home from "../pages/Home"
import Header from "../components/Header"
import Meats from "../pages/Meats"
import MeatDetail from "../pages/MeatDetail"
import CourseDetail from "../pages/CourseDetail"
import Courses from "../pages/Courses"
import Cart from '../pages/Cart'
import CustomOrder from "../pages/CustomOrder"
import Profile from "../pages/Profile"
import MyOrders from "../pages/MyOrders"
import FavoriteCourses from "../pages/FavoriteCourses"
import PendingOrders from "../pages/PendingOrders"
import OrdersFulfilled from "../pages/OrdersFulfilled"
import isStaff from "../permissions/isStaff"
import isAuthenticated from "../permissions/isAuthenticated"
import isAny from '../permissions/isAny'
import useAuth from "../hooks/useAuth"
import AccessDenied from "../pages/AccessDenied"
import MeatMenu from "../components/MeatMenu"

const ROUTES = [
  {
    path: '/',
    component: Home,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    subLayout: MeatMenu,
    permissions: isAny
  },

  {
    path: '/carnicos',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },

  {
    path: '/carnicos/:meat_id',
    component: MeatDetail,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    subLayout: MeatMenu,
    permissions: isAny


  },

  {
    path: '/carnicos/category/:category_id',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },
  
  {
    path: '/carnicos/search/:search',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },

  {
    path: '/cursos',
    component: Courses,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny



  },

  {
    path: '/cursos/:course_id',
    component: CourseDetail,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny


  },

  {
    path: '/cursos/search/:search',
    component: Courses,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny


  },

  {
    path: '/carrito',
    component: Cart,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated


  },

  {
    path: '/orden-personalizada',
    component: CustomOrder,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/perfil',
    component: Profile,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/mis-pedidos',
    component: MyOrders,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/favoritos',
    component: FavoriteCourses,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' },
    permissions: () => true

  },

  {
    path: '/pedidos-pendientes',
    component: PendingOrders,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isStaff
  },

  {
    path: '/pedidos-atendidos',
    component: OrdersFulfilled,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isStaff

  },

  {
    path: '/acceso-denegado',
    component: AccessDenied,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: () => true

  },

  {
    path: '*',
    component: <h1>404 no such page</h1>,
  },

]

export default function Navegate() {
  const { user } = useAuth()

  return (
    <Switch>
      {
        ROUTES.map((route) => (
          <Route key={route.path} path={route.path}>
            {() => {
              const { path, layout, layoutProps, subLayout, permissions } = route

              if(!permissions(user))
                return <Redirect to="/acceso-denegado"/>

              if(!layout) return <route.component/>
              // else if(!layoutProps) 
              //   return (
              //     <route.layout>
              //       <route.component/>
              //     </route.layout>
              //   )
              
              return (
                <Route key={path} path={path}>
                  <route.layout {...layoutProps} SubLayout={subLayout}>
                    <route.component/>
                  </route.layout>
                </Route>
              )
            }}

          </Route>

        ))
      }
    </Switch>
  )
}