import { Link } from "wouter"
import AuthButtons from './AuthButtons'
import Search from "./Search"

export default function Header({typeSearch}) {
  return (
    <header className="p-5 py-10 flex justify-between items-center">
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