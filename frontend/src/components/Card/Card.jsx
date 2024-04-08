import { Link } from "wouter" 
import { BASE_URL } from "../../utils/constants" 
import { Image } from "@nextui-org/react"

export default function Card(props) {
  const { image, name, author, description, path } = props
  
  return (
    <Link to={path} className="w-full max-w-[435px]">
      <div id="image">
        <Image 
          src={BASE_URL + '/' + image} 
          alt="ImageCard" 
          shadow="sm"
          classNames={{
            wrapper: 'img-container',
            img: 'w-full max-h-[266px] object-cover aspect-video'
          }}
        />
      </div>

      <div className="space-y-2 p-2">
        <div>
          <h1 className="font-bold text-2xl text-nowrap truncate">{name}</h1>
          
          {
            author &&
              <span className="truncate text-gray-400 flex items-center gap-x-2">
                <span>Profesor:</span> 
                {author ? author : <div className="w-4 h-1 bg-default-400"></div>}
              </span>

          }
        </div>
        <p className="truncate">{description}</p>
      </div>

    </Link>
  )
}