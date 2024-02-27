import { TOKEN } from './constants'
// import { jwtDecode } from 'jwt-decode'

// Guarda el Token en la session storage y
// en el local storage basandose en un parametro
export function setToken(token, isLocalStorageToken) {

  window.sessionStorage.setItem(TOKEN, token)
  if(isLocalStorageToken) window.localStorage.setItem(TOKEN, token);

}

// Devuelve el token del local Storage
export function getLocalStorageToken () {

  return window.localStorage.getItem(TOKEN);

}


// Devuelve el token del Session Storage
export function getSessionStorageToken() {

  return window.sessionStorage.getItem(TOKEN);

}


// Decodifica el token para obtener los datos
// del usuario
// export function decodeToken(token) {
  
//   return jwtDecode(token)

// }

// Elimina el token del local y el session storage
export function deleteToken() {

  window.localStorage.removeItem(TOKEN)
  window.sessionStorage.removeItem(TOKEN)
  const token = getLocalStorageToken() && getSessionStorageToken()
  if(token) return false
  return true

}