import { Button } from "@nextui-org/react"
import AddIcon2 from '../Icons/AddIcon2'

export default function BtnAddCategory({ onClick }) {
  return (
    <>
      <Button 
        color="primary"
        startContent={<AddIcon2/>}
        onClick={onClick}
        className="px-0 min-w-unit-10"
      />
    </>
  )
}