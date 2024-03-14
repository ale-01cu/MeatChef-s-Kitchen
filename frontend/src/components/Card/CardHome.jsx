import { Link } from "wouter"
import { Image } from "@nextui-org/react"

export default function CardHome(props) {
  const { imagePath, imageWith, ImageAlt, imageStyle, title, description, linkPath } = props

  return (
    <section className="relative min-w-[210px] max-w-[340px] border-5 border-solid py-5 px-5 sm:px-12 rounded-3xl border-white text-white bg-black bg-opacity-50 hover:scale-105 transition cursor-pointer">
      <Link to={linkPath}>
        <div>
          <Image 
            classNames={{ wrapper: imageStyle }}
            src={imagePath} 
            width={imageWith}
            alt={ImageAlt} 
          />
        </div>

        <div className="space-y-2">
          <div id="name" className="font-extrabold text-4xl">
            <h1>{title}</h1>
          </div>

          <div id="description">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </section>
  )
}