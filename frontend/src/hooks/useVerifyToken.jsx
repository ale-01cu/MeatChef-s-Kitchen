import { useEffect, useState } from "react"
import { getLocalStorageToken, deleteToken, setToken } from "../utils/token"
import { verifyToken } from "../services/auth"

// Verifica si el token es valido
// para saber si el usuario esta 
// logueado o no
export default function useVerifyToken() {
  const [ tokenInMemory, setTokenInMemory ] = useState()
  const [ isValid, setIsValid ] = useState(false)

  useEffect(() => {
    const token = getLocalStorageToken()
    setTokenInMemory(token)
    setToken(token, false)

    if(tokenInMemory) verifyToken()
      .then(({data}) => {
          const { is_valid } = data
          if(!is_valid) {
            setIsValid(false)
            deleteToken()
          }
          else setIsValid(is_valid)
    })

  }, [tokenInMemory, isValid])

  return { isValid, tokenInMemory, token: getLocalStorageToken() }
}