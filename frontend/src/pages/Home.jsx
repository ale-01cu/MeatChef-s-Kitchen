import AuthButtons from "../components/AuthButtons.jsx"
import { Image, Button } from "@nextui-org/react"
import { Link } from "wouter"
import CardHome from "../components/CardHome.jsx"

export default function Home() {
  return (
    <main className="min-h-screen max-h-screen">
      <div className="w-full h-full absolute">
        <Image 
          classNames={{
            wrapper: 'w-full min-w-full z-0',
            img: 'min-h-screen max-h-screen w-full object-cover'
          }} 
          src="/Imagen1.png" 
          alt="Fondo"
          radius="none"
        />
      </div>

      <div className="z-10 flex flex-col justify-between min-h-screen items-center py-10 relative">
        <div className="text-white">
          <Image 
            src="/Recurso 5.png"
            width={350}
            alt="Logo"
          />
        </div>

        <div className="flex flex-col justify-center items-center w-11/12 gap-12 sm:gap-24 sm:flex-row">

          <CardHome
            imagePath='/Imagen2.png'
            imageWith={140}
            ImageAlt='Carnicos'
            imageStyle='absolute -translate-x-32 -translate-y-6 sm:-translate-x-36 sm:-translate-y-6'
            title='Carnes'
            description='Descubre nuestras ofertas y compra carne de primera calidad en nuestra tienda en linea.'
            linkPath='/carnicos'
          />

          <CardHome
            imagePath='/Imagen3.png'
            imageWith={200}
            ImageAlt='Cursos'
            imageStyle='absolute -translate-x-36 -translate-y-6 sm:-translate-x-40 sm:-translate-y-6'
            title='Cursos'
            description='Perfecciona tu técnica de cortes carnicos con nuestros cursos especializados.'
            linkPath='/cursos'
          />

        </div>


        <div className="space-y-2">
          <AuthButtons/>
          <Button color="warning" className="text-white font-bold w-full hover:scale-105">
            Conoce Sobre Nosotros
          </Button> 

        </div>
      </div>
    </main>
  )
}