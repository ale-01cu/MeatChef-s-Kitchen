import Home from "../../../../instadream/frontend/src/pages/Home"
import Header from "../../../../instadream/frontend/src/components/Header"
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
    component: MeatDetail,
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

export default ROUTES