import { useEffect, useState } from "react"
import { getLocalStorageToken, setToken } from "../utils/token"
import { VERIFY_TOKEN_URL } from '../utils/constants'

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

    const fetchData = async () => {
      try {
        const res = await fetch(VERIFY_TOKEN_URL, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({token: tokenInMemory})
        })
        const data = await res.json()
        
        if(!res.ok){
          setIsValid(true)
          return null
        }
        
        const { is_valid } = data
        setIsValid(is_valid)
      }catch(error){
        console.error(error);
      }
      // const result = await verifyToken({
      //     variables: { token: tokenInMemory }
      // })
      // setIsValid(result?.data?.verifyToken)

    }
    if(tokenInMemory) fetchData()

 }, [tokenInMemory])

  return [ isValid, tokenInMemory, getLocalStorageToken() ]
}