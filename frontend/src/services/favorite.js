const FAVORITE_COURSES = 'favorite-courses'

export const addToFavorites = (course) => {
  const fav = window.localStorage.getItem(FAVORITE_COURSES)

  if(!fav) {
    window.localStorage.setItem(
      FAVORITE_COURSES, 
      JSON.stringify([course])
    )
  
  }else {
    const favObject = JSON.parse(fav)
    const found = favObject.find((value) => value.id === course.id)
    if(found) throw new Error('Course already in the Favorites.')

    const newFavObject = [
      ...favObject,
      course
    ]
  
    window.localStorage.setItem(
      FAVORITE_COURSES, 
      JSON.stringify(newFavObject)
    )

  }
}


export const deleteCourseFromFavorites = (id) => {
  const favObject = getFavorites()
  const newFav = favObject.filter((prod) => prod.id !== id)
  window.localStorage.setItem(FAVORITE_COURSES, JSON.stringify(newFav))

}

export const courseIsInFavorites = (courseId) => {
  const fav = getFavorites()
  const found = fav.find((c) => c.id === courseId)
  if(found) return true
  return false

}


export const getFavorites = () => {
  const fav = window.localStorage.getItem(FAVORITE_COURSES)
  if(!fav) return []
  return JSON.parse(fav)
}