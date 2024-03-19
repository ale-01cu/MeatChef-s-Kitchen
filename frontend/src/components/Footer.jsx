import CallIcon from "./Icons/CallIcon"
import WhatAppIcon from "./Icons/WhatAppIcon"
import XIcon from "./Icons/XIcon"
import GpsIcon from "./Icons/GpsIcon"
import InstagramIcon from "./Icons/InstagramIcon"
import { Image } from "@nextui-org/react"

export default function Footer() {
  return (
    <div className="w-full h-60 bg-black flex justify-between items-center p-8">

      <div className="flex flex-col gap-y-3">
        <span className="font-bold text-lg hover:scale-105 transition cursor-pointer">Mapa del Sitio</span>
        <span className="font-bold text-lg hover:scale-105 transition cursor-pointer">Cursos</span>
        <span className="font-bold text-lg hover:scale-105 transition cursor-pointer">Acerca de</span>
      </div>

      <dir>
        <Image src="/Recurso 5.png" width={300}/>
      </dir>

      <div className="flex flex-col gap-y-4">
        <div className="grid grid-cols-3 gap-x-4">
          <span className="hover:scale-110 transition cursor-pointer"><CallIcon width={48}/></span>
          <span className="hover:scale-110 transition cursor-pointer"><WhatAppIcon width={48}/></span>
          <span className="hover:scale-110 transition cursor-pointer"><XIcon width={48}/></span>
        </div>
        <div className="flex justify-center gap-x-4">
          <span className="hover:scale-110 transition cursor-pointer"><InstagramIcon width={48}/></span>
          <span className="hover:scale-110 transition cursor-pointer"><GpsIcon width={48}/></span>
        </div>
      </div>

    </div>
  )
}