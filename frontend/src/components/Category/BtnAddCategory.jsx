import AddIcon from "../AddIcon"
import { Button } from "@nextui-org/react"

export default function BtnAddCategory({ onClick }) {
  return (
    <>
      <Button 
        color="primary"
        startContent={<AddIcon/>}
        onClick={onClick}
      />
    </>
  )
}