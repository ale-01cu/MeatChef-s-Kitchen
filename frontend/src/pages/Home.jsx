import { useEffect, useState } from "react"
import MeatSlider from "../components/Meats/MeatSlider.jsx"
import { listLastMeats } from "../services/meats.js"
import CustomCard from "../components/Card/Card.jsx"
import { Link } from "wouter"
import { BASE_URL } from "../utils/constants.js"
import { Button, Image } from "@nextui-org/react"
import { listLastCourses } from '../services/courses.js'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import CallIcon from '../components/Icons/CallIcon.jsx'
import WhatAppIcon from '../components/Icons/WhatAppIcon.jsx'
import XIcon from '../components/Icons/XIcon.jsx'
import Instagramicon from '../components/Icons/InstagramIcon.jsx'
import GpsIcon from '../components/Icons/GpsIcon.jsx'


const data = [
  {
    id: '5a65s4d6as4d',
    photo: '/Banner 1Recurso 3.png'
  },

  {
    id: 'as4da5sda5s6',
    photo: '/Banner 2Recurso 5.png'
  }
]

export default function Home() {
  const [ lastMeats, setLastMeats ] = useState([])
  const [ lastCourses, setLastCourses ] = useState([])

  useEffect(() => {
    listLastMeats()
      .then((data) => {
        setLastMeats(data)
      })
  }, [])

  useEffect(() => {
    listLastCourses()
      .then((data) => {
        setLastCourses(data)
      })
  }, [])

  return (
    <div className="px-8 pt-12 flex flex-col gap-y-8">
      <MeatSlider meatData={data}/>

      <div className="py-12">
        <h1 className="p-8 text-2xl font-bold text-center">Nuestros Ultimos Productos.</h1>
        <ul className="flex justify-center gap-x-4">
          {
            lastMeats.map((meat) => (
              <li key={meat.id} className="relative flex">
                {/* <Link to={'/carnicos/' + meat.id} className="w-full">
                  <div id="image">
                    <Image src={BASE_URL + '/' + meat.photo} alt="ImageCard" classNames={{
                      wrapper: 'w-full img-container',
                      img: 'max-h-[266px] object-cover aspect-video'
                    }}/>
                  </div>

                  <div className="space-y-2 p-2">
                    <h1 className="font-bold text-2xl text-nowrap truncate">{meat.name_of_the_cut_of_meat}</h1>
                    <p className="truncate">{meat.description}</p>
                  </div>

                </Link> */}
                <Link to={'/carnicos/' + meat.id}>
                  <Card shadow="sm" key={meat.id} className="max-w-[350px] hover:-translate-y-2" isPressable onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0 ">
                      <Image
                        shadow="sm"
                        radius="lg"
                        alt={meat.name}
                        className="w-full object-cover h-[400px]"
                        classNames={{
                        }}
                        src={BASE_URL + '/' + meat.photo}
                      />
                    </CardBody>
                    <CardFooter className="text-small flex-col">
                      <b className="text-xl">{meat.name_of_the_cut_of_meat}</b>
                      {/* <p className="text-default-500 truncate">{course.description}</p> */}
                    </CardFooter>
                  </Card>
                </Link>
                {/* <CustomCard
                  image={meat.photo}
                  name={meat.name_of_the_cut_of_meat}
                  description={meat.description}
                  btnText='Comprar'
                  path={'/carnicos/' + meat.id}
                /> */}
              </li>
            ))
          }
        </ul>
        <div className="flex justify-center pt-12">
          <Button
            color="default"
            variant="solid"
          >
            Ver Mas
          </Button>
        </div>
      </div>


      <div className="py-12 flex gap-x-2 w-full">
        <Image
          src="/Banner 3 DE LOS CURSOSRecurso 6.png"
          classNames={{
            wrapper: 'w-full w-2/3',
            img: 'object-cover w-full max-h-[750px]'
          }}  
        />
        <Image
          src="/Banner 4 VERTICALRecurso 7.png"
          classNames={{
            wrapper: 'w-full w-1/3',
            img: 'object-cover w-full max-h-[750px]'
          }} 
        />
      </div>


      <div className="py-12">
        <h1 className="p-8 text-2xl font-bold text-center">
          Cursos de Meat Chef's
        </h1>

        <ul className="flex justify-center items-start gap-x-4">
          {/* {

            lastCourses.map((course) => (
              <li key={course.id} className="relative w-96">
                <Card 
                  image={course.photo}
                  name={course.name}
                  description={course.description}
                  path={'/cursos/' + course.id}
                />
              </li>
            ))

          } */}
          {

            lastCourses.map((course) => (
              <Card shadow="sm" key={course.id} className="max-w-[350px] hover:-translate-y-2" isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0 ">
                  <Image
                    shadow="sm"
                    radius="lg"
                    alt={course.name}
                    className="w-full object-cover h-[400px]"
                    classNames={{
                    }}
                    src={BASE_URL + '/' + course.photo}
                  />
                </CardBody>
                <CardFooter className="text-small flex-col">
                  <b className="text-xl self-start truncate">{course.name}</b>
                  {/* <p className="text-default-500 truncate">{course.description}</p> */}
                </CardFooter>
              </Card>
            ))
          }
        </ul>
         <div className="flex justify-center pt-12">
          <Button
            color="default"
            variant="solid"
          >
            Ver Mas
          </Button>
        </div>
      </div>

      <footer className="w-full h-72 bg-black flex justify-between items-center p-8">

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
            <span className="hover:scale-110 transition cursor-pointer"><Instagramicon width={48}/></span>
            <span className="hover:scale-110 transition cursor-pointer"><GpsIcon width={48}/></span>
          </div>
        </div>

      </footer>
    </div>
  )
}