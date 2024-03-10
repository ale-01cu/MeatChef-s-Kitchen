import {NextUIProvider} from "@nextui-org/react";
import { useState, useMemo, useCallback } from 'react';
import AuthContext from './contexts/AuthContext'
import useVerifyToken from './hooks/useVerifyToken';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify'
import { getFullUser } from './services/auth';
import Navegate from './routes/Navegate';

function App() {
  const { isValid } = useVerifyToken()
  const [ auth, setAuth ] = useState(false)
  const [ user, setUser ] = useState()

  const setMyUser = useCallback(() => {
    getFullUser()
      .then(({response, data}) => {
        if(!response.ok) setUser(null)
        else setUser(data)} 
      )
  }, [])

  useEffect(() => {
    if(isValid) setAuth(true)
    else setAuth(false)
  }, [ isValid ])

  useEffect(() => setMyUser(), [setMyUser])

  const authData = useMemo(() => ({
    auth,
    user,
    setAuth,
    setMyUser,
    setUser
  }),[ auth, user, setMyUser ])

  return (
    <AuthContext.Provider value={authData}>

      <NextUIProvider>
        <Navegate/>
        {/* <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme={"light"}
        /> */}
      </NextUIProvider>
    </AuthContext.Provider>

  )
}

export default App
