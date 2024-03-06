import { useRef } from "react"
import { Button } from "@nextui-org/react";


export default function InputFile(props) {
  const { fileAccept, handleChange, text, name, value, startContentIcon } = props
  const inputFileRef = useRef(null)

  const handleButtonClick = () => {
    // activa el click del input file
    inputFileRef.current.click();
  };
  
  return (
    <>
      <input 
        name={name}
        type="file" 
        hidden 
        accept={fileAccept}
        ref={inputFileRef}
        onChange={handleChange}
      />
      <Button 
        type="button"
        aria-label="add-publication" 
        color='default'
        onClick={handleButtonClick}
        className="w-full mb-1"
      >
        <span className="flex justify-start items-center w-20 gap-x-2">
          { startContentIcon }
          {text}
        </span>
      </Button>
    </>
  )
}