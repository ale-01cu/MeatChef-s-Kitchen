import { useContext } from "react";
import AuthContext from '../contexts/AuthContext';

// Devuelve el contexto de toda la app
const useAuth = () => useContext(AuthContext)
export default useAuth