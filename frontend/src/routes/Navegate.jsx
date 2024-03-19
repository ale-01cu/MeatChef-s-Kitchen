import { Switch, Route } from "wouter"
import Home from "../pages/Home"
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
import MeatMenu from "../components/Meats/MeatMenu"
import BaseLayout from "../layout/baseLayout"

const ROUTES = [
  {
    path: '/',
    component: Home,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    subLayout: MeatMenu,
    permissions: isAny
  },

  {
    path: '/carnicos',
    component: Meats,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },

  {
    path: '/carnicos/:meat_id',
    component: MeatDetail,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    subLayout: MeatMenu,
    permissions: isAny


  },

  {
    path: '/carnicos/category/:category_id',
    component: Meats,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },
  
  {
    path: '/carnicos/search/:search',
    component: Meats,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAny


  },

  {
    path: '/cursos',
    component: Courses,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny



  },

  {
    path: '/cursos/:course_id',
    component: CourseDetail,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny


  },

  {
    path: '/cursos/search/:search',
    component: Courses,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'cursos' },
    permissions: isAny


  },

  {
    path: '/carrito',
    component: Cart,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated


  },

  {
    path: '/orden-personalizada',
    component: CustomOrder,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/perfil',
    component: Profile,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/mis-pedidos',
    component: MyOrders,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isAuthenticated

  },

  {
    path: '/favoritos',
    component: FavoriteCourses,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'cursos' },
    permissions: () => true

  },

  {
    path: '/pedidos-pendientes',
    component: PendingOrders,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isStaff
  },

  {
    path: '/pedidos-atendidos',
    component: OrdersFulfilled,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: isStaff

  },

  {
    path: '/acceso-denegado',
    component: AccessDenied,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos' },
    permissions: () => true

  },

  {
    path: '*',
    component: <h1>404 no such page</h1>,
  },

]

export default function Navegate() {
  const { user, authIsLoading } = useAuth()

  if(authIsLoading) return <h1>Cargando</h1>
  return (
    <Switch>
      {
        ROUTES.map((route) => (
          <Route key={route.path} path={route.path}>
            {() => {
              const { path, layout, layoutProps, subLayout, permissions, footer } = route

              if(!permissions(user))
                return <h1>Acceso denegado</h1>

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