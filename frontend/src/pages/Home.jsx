import MeatSlider from "../components/Meats/MeatSlider.jsx"
import { Image } from "@nextui-org/react"
import Footer from '../components/Footer/Footer.jsx'
import LastMeatlist from "../components/HomeSections/LastMeatsList.jsx"
import LastCourseList from "../components/HomeSections/LastCourseList.jsx"
import { useMemo } from "react"

export default function Home() {
  const data = useMemo(() => (
    [
      {
        id: '5a65s4d6as4d',
        photo: '/Banner 1Recurso 3.png'
      },

      {
        id: 'as4da5sda5s6',
        photo: '/Banner 2Recurso 5.png'
      }
    ]
  ), [])
  // const [ isLoading, setIsLoading ] = useState(false)

  // return <HomeSkeleton/>
  return (
    <div className="pt-12 flex flex-col gap-y-8">

      <div className="sm:px-12">
        <section>
          <MeatSlider meatData={data}/>
        </section>
        <section className="py-12">
          <LastMeatlist/>
        </section>


        <section className="py-12 flex flex-col sm:flex-row gap-x-2 w-full">
          <Image
            src="/Banner 3 DE LOS CURSOSRecurso 6.png"
            classNames={{
              wrapper: 'w-full sm:w-2/3 img-container',
              img: 'object-cover w-full h-full max-h-[750px]'
            }}  
          />
          <Image
            src="/Banner 4 VERTICALRecurso 7.png"
            classNames={{
              wrapper: 'w-full sm:w-1/3 img-container',
              img: 'object-cover w-full h-full max-h-[750px]'
            }} 
          />
        </section>


        <section className="py-12">
          <LastCourseList/>
        </section>

      </div>

      <Footer/>
    </div>
  )
}