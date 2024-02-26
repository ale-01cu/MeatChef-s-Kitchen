import { useEffect, useState } from "react"
import { getLocalStorageToken, deleteToken, setToken } from "../utils/token"
import { verifyToken, getFullUser } from "../services/auth"

// Verifica si el token es valido
// para saber si el usuario esta 
// logueado o no
export default function useVerifyToken() {
  const [ tokenInMemory, setTokenInMemory ] = useState()
  const [ isValid, setIsValid ] = useState(false)
  const [ user, setUser ] = useState()

  useEffect(() => {
    const token = getLocalStorageToken()
    setTokenInMemory(token)
    setToken(token, false)

    if(tokenInMemory) verifyToken()
      .then(({res, data}) => {
          if(!res.ok){
            setIsValid(true)
            return null
          }
          const { is_valid } = data
          setIsValid(is_valid)
      })

  }, [tokenInMemory, isValid])


  useEffect(() => {
    getFullUser()
      .then(data => setUser(data))
  }, [])

  return { isValid, tokenInMemory, token: getLocalStorageToken(), user }
}