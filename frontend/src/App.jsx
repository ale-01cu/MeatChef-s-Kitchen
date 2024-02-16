import Home from './pages/Home'
import {NextUIProvider} from "@nextui-org/system";
import { Route, Switch } from "wouter";
import { useState, useMemo } from 'react';
import AuthContext from './contexts/AuthContext'
import useVerifyToken from './hooks/useVerifyToken';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify'

function App() {
  const [ tokenInMemory] = useVerifyToken()
  const [ auth, setAuth ] = useState(false)


  useEffect(() => {
    if(tokenInMemory) setAuth(true)
    else setAuth(false)
    
  }, [ tokenInMemory ])

  const authData = useMemo(() => ({
    auth,
    setAuth
  }),[ auth ])

  return (
    <AuthContext.Provider value={authData}>

      <NextUIProvider>
        <Switch>
          <Route path="/" component={Home} />
          {/* <Route path="/users/:name">
            {(params) => <>Hello, {params.name}!</>}
          </Route> */}
          {/* Default route in a switch */}
          <Route>404: No such page!</Route>
        </Switch>
      </NextUIProvider>
      <ToastContainer
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
      />
    </AuthContext.Provider>

  )
}

export default App
