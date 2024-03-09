import { Switch, Route } from "wouter"
import Home from "../pages/Home"
import Header from "../components/Header"
import Meats from "../pages/Meats"
import MeatDetail from "../pages/MeatDetail"
import CourseDetail from "../pages/CourseDetail"
import Courses from "../pages/Courses"

const ROUTES = [
  {
    path: '/',
    component: Home,
  },

  {
    path: '/carnicos',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' }
  },

  {
    path: '/carnicos/:meat_id',
    component: MeatDetail,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' }
  },

  {
    path: '/carnicos/category/:category_id',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' }
  },
  
  {
    path: '/carnicos/search/:search',
    component: Meats,
    layout: Header,
    layoutProps: { typeSearch: 'carnicos' }
  },

  {
    path: '/cursos',
    component: Courses,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' }

  },

  {
    path: '/cursos/:course_id',
    component: CourseDetail,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' }
  },

  {
    path: '/cursos/search/:search',
    component: Courses,
    layout: Header,
    layoutProps: { typeSearch: 'cursos' }
  },

  {
    path: '*',
    component: <h1>404 no such page</h1>,
  },

]

export default function Navegate() {
  return (
    <Switch>
      {
        ROUTES.map((route) => (
          <Route key={route.path} path={route.path}>
            {() => {
              const { path, layout, layoutProps } = route
              if(!layout) return <route.component/>
              else if(!layoutProps) 
                return <route.layout>
                  <route.component/>
                </route.layout>
               
              return <Route key={path} path={path}>
                <route.layout {...layoutProps}>
                  <route.component/>
                </route.layout>
              </Route>
            }}

          </Route>

        ))
      }
    </Switch>
  )
}