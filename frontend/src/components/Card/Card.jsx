import { Link } from "wouter" 
import { BASE_URL } from "../../utils/constants" 
import { Image } from "@nextui-org/react"

export default function Card(props) {
  const { image, name, author, description, path } = props
  
  return (
    <Link to={path} className="w-full">
      <div id="image">
        <Image src={BASE_URL + '/' + image} alt="ImageCard" classNames={{
          wrapper: 'img-container',
          img: 'w-full max-h-[266px] object-cover aspect-video'
        }}/>
      </div>

      <div className="space-y-2 p-2">
        <div>
          <h1 className="font-bold text-2xl text-nowrap truncate">{name}</h1>
          { author && <span className="truncate">Profesor: {author}</span> } 
        </div>
        <p className="truncate">{description}</p>
      </div>

    </Link>
  )
}