import { Link } from "wouter"
import { useMemo } from "react"

export default function HomeLink({ typeSearch }) {

  const src = useMemo(() => (
    typeSearch === 'cursos' 
      ? "/Imagen4.png" 
      : '/Recurso 3.png'
  ), [typeSearch])

  const width = useMemo(() => (
    typeSearch === 'cursos' 
      ? 150
      : 50
  ), [typeSearch])

  return (
    <Link to="/">
      <img
        src={src}
        alt="Logo"
        width={width}
        className="min-w-[50px] rounded-2xl"
      />
    </Link>
  )
}