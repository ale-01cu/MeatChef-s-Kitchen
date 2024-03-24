import { useEffect, useState, useCallback } from "react"
import { getLocalStorageToken, deleteToken, setToken } from "../utils/token"
import { verifyToken } from "../services/auth"
import { getFullUser } from "../services/auth"

// Verifica si el token es valido
// para saber si el usuario esta 
// logueado o no
export default function useVerifyToken() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ user, setUser ] = useState()

  const setMyUser = useCallback(() => {
    getFullUser()
      .then(({response, data}) => {
        if(!response.ok) setUser(null)
        else setUser(data)} 
      )
  }, [])

  useEffect(() => {
    const token = getLocalStorageToken()
    setToken(token, false)

    verifyToken()
      .then(({data}) => {
          const { is_valid } = data
          if(!is_valid) {
            // setIsValid(false)
            deleteToken()
          }
          else {
            setMyUser()
            // setIsValid(is_valid)
          }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        console.log('llegue al final por tanto le quito el loading');
        setIsLoading(false)
      })

  }, [])

  // useEffect(() => {
  //   if(isValid) {


  //   } else setAuth(false)
  // }, [ isValid, setMyUser ])


  return { 
    token: getLocalStorageToken(),
    authIsLoading: isLoading,
    user,
    setUser,
    setMyUser
  }
}