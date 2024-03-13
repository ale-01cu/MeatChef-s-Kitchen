import fetching from '../utils/fetching'
import { COURSES_URL } from '../utils/constants'
import { getSessionStorageToken } from '../utils/token'

export const listCourses = async () => {

  const { data }  = await fetching({
    url: COURSES_URL,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}

export const listSearchCourses = async (query) => {

  const { data }  = await fetching({
    url: COURSES_URL + '/search/' + query,
    method: 'GET',
    headers: {'authorization': getSessionStorageToken()}

  })

  return data
}


export const deleteCourse = async (course_id) => {
  const res = await fetch(COURSES_URL + '/' + course_id, {
    method: 'DELETE',
    headers: {'authorization': getSessionStorageToken()}
  })

  if(!res.ok) {
    const data = await res.json()
    throw new Error(data.detail)
  }
  return true
}


export const updateCourse = async (course_id, formData) => {
  const { response, data } = await fetching({
    url: COURSES_URL + '/' + course_id,
    method: 'PUT',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}

  })

  return {
    res: response,  
    data
  }

}

export const createCourse = async (formData) => {
  const { response, data } = await fetching({
    url: COURSES_URL,
    method: 'POST',
    body: formData,
    headers: {'authorization': getSessionStorageToken()}
  })

  return {
    res: response,  
    data
  }

}


export const retrieveCourses = async (courseId) => {
  const { data }  = await fetching({
    url: COURSES_URL + '/' + courseId,
    method: 'GET',
    headers: {
      'content-type': 'aplication/json',
      'authorization': getSessionStorageToken()
    },
  })

  return data
}