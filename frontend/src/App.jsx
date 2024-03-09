import Home from './pages/Home'
import {NextUIProvider} from "@nextui-org/react";
import { Route, Switch } from "wouter";
import { useState, useMemo, useCallback } from 'react';
import AuthContext from './contexts/AuthContext'
import useVerifyToken from './hooks/useVerifyToken';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify'
import Meats from './pages/Meats';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import { getFullUser } from './services/auth';
import MeatDetail from './pages/MeatDetail';
import Navegate from './routes/Navegate';

function App() {
  const { isValid } = useVerifyToken()
  const [ auth, setAuth ] = useState(false)
  const [ user, setUser ] = useState()

  const setMyUser = useCallback(() => {
    getFullUser()
      .then(({response, data}) => {
        if(response.status != 200) setUser(null)
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
    setAuth,
    user,
    setMyUser
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
