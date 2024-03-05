import AuthButtons from "../components/AuthButtons.jsx"
import { Image, Button } from "@nextui-org/react"
import { Link } from "wouter"

export default function Home() {
  return (
    <main className="min-h-screen max-h-screen bg-black">
      <div className="w-full h-full absolute opacity-50">
        <Image 
          classNames={{
            wrapper: 'w-full min-w-full z-0',
            img: 'max-h-screen w-full object-cover'
          }} 
          src="/_8146030e-f9e8-4e43-b9ea-11322be32dc1.jpg" 
          alt=""
          radius="none"
        />
      </div>

      <div className="z-10 flex flex-col justify-between min-h-screen items-center py-10 relative">
        <div className="text-white">
          la otra foto
        </div>

        <div className="flex gap-24">

          <section className="w-80 border-5 border-solid py-5 px-12 rounded-3xl border-white text-white bg-black bg-opacity-50 hover:scale-110 transition cursor-pointer">
            <Link to="/carnicos">
              <div id="image">
                <Image src='' alt="" />
              </div>

              <div className="space-y-2">
                <div id="name" className="font-extrabold text-4xl">
                  <h1>Carnes</h1>
                </div>

                <div id="description">
                  <p>Descubre nuestras ofertas y compra carne de primera calidad en nuestra tienda en linea.</p>
                </div>
              </div>
            </Link>
          </section>

          <section className="w-80 border-5 border-solid py-5 px-12 rounded-3xl border-white text-white bg-black bg-opacity-50 hover:scale-105 transition cursor-pointer">
            <Link to="/cursos">
              <div id="image">
                <Image src='' alt="" />
              </div>

              <div className="space-y-2">
                <div id="name" className="font-extrabold text-4xl">
                  <h1>Cursos</h1>
                </div>

                <div id="description">
                  <p>Perfecciona tu técnica de cortes carnicos con nuestros cursos especializados.</p>
                </div>
              </div>
            </Link>
          </section>
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