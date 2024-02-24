import { Link } from "wouter"
import AuthButtons from './AuthButtons'
import Search from "./Search"

export default function Header({typeSearch}) {
  return (
    <header>
      <div>
        <Link to="/">
          Home
        </Link>
      </div>

      <Search type={typeSearch}/>

      <div>
        <AuthButtons/>
      </div>
    </header>
  )
}