import { Link } from "wouter" 
import { BASE_URL } from "../utils/constants" 
import { Image } from "@nextui-org/react"

export default function Card(props) {
  const { image, name, description, path } = props
  
  return (
    <Link to={path}>
      <div id="image">
        <Image src={BASE_URL + '/' + image} alt="ImageCard" />
      </div>

      <div className="space-y-2 flex justify-center flex-col items-center">
        <div id="name">
          <p className="font-bold text-pretty text-2xl">{name}</p>
        </div>

        <div id="description">
          <p className="text-pretty">{description}</p>
        </div>
      </div>

    </Link>
  )
}