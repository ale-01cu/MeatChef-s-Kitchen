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
import isSuperUser from '../permissions/isSuperUser'
import isAuthenticated from "../permissions/isAuthenticated"
import isAny from '../permissions/isAny'
import useAuth from "../hooks/useAuth"
import AccessDenied from "../pages/AccessDenied"
import MeatMenu from "../components/Meats/MeatMenu"
import BaseLayout from "../components/layout/BaseLayout"
import Users from "../pages/Users"
import NotFound404 from "../pages/NotFound404"
import Spinner from "../components/Loading/Spinner"

const ROUTES = [
  {
    path: '/',
    component: Home,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos', SubLayout: MeatMenu },
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
    path: '/pedidos-pendientes',
    component: PendingOrders,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos', SubLayout: MeatMenu },
    permissions: isStaff
  },

  {
    path: '/pedidos-atendidos',
    component: OrdersFulfilled,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'carnicos', SubLayout: MeatMenu },
    permissions: isStaff

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
    path: '/user',
    component: Users,
    layout: BaseLayout,
    layoutProps: { typeSearch: 'usuarios' },
    permissions: isSuperUser
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
    component: NotFound404,
  },

]

export default function Navegate() {
  const { user, authIsLoading } = useAuth()

  if(authIsLoading) return <Spinner/>
  return (
    <Switch>
      {
        ROUTES.map((route) => (
          <Route key={route.path} path={route.path}>
            {() => {
              const { layout, layoutProps, permissions } = route

              if(permissions && !permissions(user))
                return (
                  <route.layout {...layoutProps}>
                    <NotFound404/>
                  </route.layout>
                )

              if(!layout) return <route.component/>
              
              return (
                <route.layout {...layoutProps}>
                  <route.component/>
                </route.layout>
              )
            }}

          </Route>

        ))
      }
    </Switch>
  )
}