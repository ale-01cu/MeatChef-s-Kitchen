import {NextUIProvider} from "@nextui-org/react";
import AuthContext from './contexts/AuthContext'
import useVerifyToken from './hooks/useVerifyToken';
import { ToastContainer } from 'react-toastify'
import Navegate from './routes/Navegate';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const authData = useVerifyToken()

  return (
    <AuthContext.Provider value={authData}>

      <NextUIProvider>
        <Navegate/>
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
        theme={"dark"}
      />
    </AuthContext.Provider>

  )
}

export default App
