import { Link } from "wouter"
import AuthButtons from './AuthButtons'

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">
          Home
        </Link>
      </div>

      <div>
        <input 
          type="search" 
          name="search" 
          id="search" 
          placeholder="Buscar..."
        />
      </div>

      <div>
        <AuthButtons/>
      </div>
    </header>
  )
}