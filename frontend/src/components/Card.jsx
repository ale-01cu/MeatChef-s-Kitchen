import { Link } from "wouter" 
import { BASE_URL } from "../utils/constants" 
import { Image } from "@nextui-org/react"

export default function Card(props) {
  const { image, name, description, path } = props
  
  return (
    <Link to={path} className="w-full">
      <div id="image">
        <Image src={BASE_URL + '/' + image} alt="ImageCard" classNames={{
          wrapper: 'w-full',
          img: 'max-h-[266px] object-cover aspect-video'
        }}/>
      </div>

      <div className="space-y-2 p-2">
        <h1 className="font-bold text-2xl text-nowrap truncate">{name}</h1>
        <p className="truncate">{description}</p>
      </div>

    </Link>
  )
}