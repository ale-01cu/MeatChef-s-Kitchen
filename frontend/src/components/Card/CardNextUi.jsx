import { Card, Image, CardBody, CardFooter } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"
import { Link } from "wouter"

export default function CardNextUi({ id, alt, image, title, to }) {
  return (
    <Card 
      shadow="sm" 
      key={id} 
      className="max-w-[350px] hover:-translate-y-2" 
      isPressable 
      onPress={() => console.log("item pressed")}
    >
      <Link to={to}>
        <CardBody className="overflow-visible p-0 ">
          <Image
            shadow="sm"
            radius="lg"
            alt={alt}
            className="w-full object-cover h-[400px]"
            classNames={{
            }}
            src={BASE_URL + '/' + image}
          />
        </CardBody>
        <CardFooter className="text-small flex-col ">
          <b className="text-xl truncate max-w-[350px]">{title}</b>
          {/* <p className="text-default-500 truncate">{course.description}</p> */}
        </CardFooter>
      </Link>
    </Card>
  )
}