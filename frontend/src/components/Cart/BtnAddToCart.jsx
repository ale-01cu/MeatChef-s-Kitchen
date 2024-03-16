import { Button } from "@nextui-org/react"
import CartIcon from "../Icons/CartIcon"
import useRoles from "../../hooks/useRoles"

export default function BtnAddToCart({ text, handleAddToCart, isDisable }) {
  const { isClient } = useRoles()
  
  if(!isClient) return null
  return (
    <Button 
        type='submit'
        color="warning" 
        isLoading={false}
        onPress={handleAddToCart}
        startContent={<CartIcon/>}
        isDisabled={isDisable}
      >
          { text }
      </Button>
  )
}