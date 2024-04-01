import { useParams } from "wouter"
import { retrieveMeats } from "../services/meats"
import { useCallback, useEffect, useState } from "react"
import { Image, Input } from "@nextui-org/react"
import { BASE_URL } from "../utils/constants"
import CardChipStatus from '../components/Card/CardChipStatus'
import ActiveIcon from '../components/Icons/ActiveIcon'
import CloseIcon from '../components/Icons/CloseIcon'
import useAuth from "../hooks/useAuth"
import { addToCart } from '../services/cart'
import { productIsInCart } from "../services/cart"
import BtnAddToCart from "../components/Cart/BtnAddToCart"
import { Spinner } from "@nextui-org/react"
import GeneralError from "../components/Errors/GeneralError"

export default function MeatDetail() {
  const { user } = useAuth()
  const { meat_id } = useParams()
  const [ meat, setMeat ] = useState()
  const [ amount, setAmount ] = useState(1)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isError, setIsError ] = useState()
  const [ isInCart, setIsInCart ] = useState(false)

  useEffect(() => {
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

  const handleAddToCart = useCallback(() => {
    try {
      addToCart({
        ...meat,
        amount
      })
      setIsInCart(true)
      
    }catch(e) {
      console.error(e);
    }
  }, [amount, meat])

  if(isLoading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner
        size="lg"
        color="warning"
      />
    </div>
  )
  if(!meat) return null
  if(isError) return <GeneralError/>

  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-y-8 p-2 sm:p-10 md:flex-row md:justify-center md:gap-x-12 md:items-start">
          <section className="">
            <Image 
              src={BASE_URL + '/' + meat?.photo} 
              alt="ImageCard"
              classNames={{
                wrapper: 'w-full',
                img: 'max-h-[266px] object-cover aspect-video'
              }}
            />
          </section>

          <section className="flex flex-col gap-y-4 items-start">
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

            <div className="flex justify-start gap-y-2 items-center flex-wrap gap-x-3">
              
              <Input
                label="Cantidad"
                name="amount"
                type="number"
                placeholder="Cantidad de producto"
                onChange={(value) => setAmount(value.target.value)}
                value={amount}
                min={1}
                isDisabled={isInCart}
                classNames={{
                  base: 'w-52'
                }}
              />

              <BtnAddToCart 
                text={isInCart ? 'Ya esta en el carrito' : 'Agregar al Carrito'}
                handleAddToCart={handleAddToCart}
                isDisable={isInCart}
              />

            </div>
          </section>

        </div>

      </div>
    </div>
  )
}