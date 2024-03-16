import { useParams } from "wouter"
import { retrieveMeats } from "../services/meats"
import { useEffect, useState } from "react"
import { Image, Input, Button } from "@nextui-org/react"
import { BASE_URL } from "../utils/constants"
import CardChipStatus from '../components/Card/CardChipStatus'
import ActiveIcon from '../components/Icons/ActiveIcon'
import CloseIcon from '../components/Icons/CloseIcon'
import useAuth from "../hooks/useAuth"
import { addToCart } from '../services/cart'
import CartIcon from '../components/Icons/CartIcon'
import { productIsInCart } from "../services/cart"
import MeatMenu from "../components/MeatMenu"
import BtnAddToCart from "../components/Cart/BtnAddToCart"

export default function MeatDetail() {
  const { user } = useAuth()
  const { meat_id } = useParams()
  const [ meat, setMeat ] = useState()
  const [ amount, setAmount ] = useState(1)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState()
  const [ isInCart, setIsInCart ] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    retrieveMeats(meat_id)
      .then(data => setMeat(data))
      .catch((e) => {
        console.error(e)
        setIsError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [meat_id])

  useEffect(() => {
    const is = productIsInCart(meat_id)
    setIsInCart(is)
  }, [meat_id])

  const handleAddToCart = () => {
    try {
      addToCart(meat)
      setIsInCart(true)
      
    }catch(e) {
      console.error(e);
    }
  }

  if(isLoading) return <h1>Cargando</h1>
  else if(isError) return <h1>Revento esta talla</h1>
  else if(!meat) return null


  return (
    <div>
      
      <MeatMenu/>
            
      <div className="">
        <div className="flex p-20 justify-center items-center">
          <section className="w-1/2 flex justify-center">
            <Image 
              src={BASE_URL + '/' + meat?.photo} 
              alt="ImageCard"
              classNames={{
                wrapper: 'w-full',
                img: 'max-h-[266px] object-cover aspect-video'
              }}
            />
          </section>

          <section className="flex flex-col gap-y-4 w-1/2 items-start">
            <h1 className="font-bold text-5xl">
              {meat?.name_of_the_cut_of_meat}
            </h1>
            {
                user?.is_superuser 
                  && <>
                    {
                      meat?.is_active 
                      ? <CardChipStatus startContentIcon={<ActiveIcon/>} text='Activo' color='success'/>
                      : <CardChipStatus startContentIcon={<CloseIcon/>} text='Inactivo' color='danger'/>
                    }
                  </>
            }
            <h3 className="text-xl">
              {meat?.type_of_meat}
            </h3>
            <h2 className="text-2xl font-bold text-amber-600">
              {meat?.price} MLC
            </h2>
            <p className="max-w-96">{meat?.description}</p>

            <div className="flex justify-center items-center gap-x-3">
              
              <Input
                label="Cantidad"
                name="amount"
                type="number"
                placeholder="Cantidad de producto"
                onChange={(value) => setAmount(value.target.value)}
                value={amount}
                min={1}
                classNames={{
                  base: 'w-52'
                }}
              />

              {
                isInCart
                  ? <BtnAddToCart 
                      text='Ya esta en el carrito'
                      handleAddToCart={handleAddToCart}
                      isDisable={true}
                    />
                  : <BtnAddToCart 
                      text='Agregar al Carrito'
                      handleAddToCart={handleAddToCart}
                      isDisable={false}
                    />
              }
            </div>
          </section>

        </div>

      </div>
    </div>
  )
}