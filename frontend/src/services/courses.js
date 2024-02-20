import fetching from '../utils/fetching'
import { COURSES_URL } from '../utils/constants'

export const listCourses = async () => {

  const { data }  = await fetching({
    url: COURSES_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  return data
}



export const retrieveCourses = async (courseId) => {
  const { data }  = await fetching({
    url: COURSES_URL + '/' + courseId,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json'
    },
  })

  return data
}