import { useRef } from "react"
import { Button } from "@nextui-org/react";


export default function InputFile(props) {
  const { 
    fileAccept, 
    handleChange, 
    text, 
    name, 
    startContentIcon, 
    className, 
    spanClassName,
    color,
    isLoading,
    errorMessage,
    isInvalid
  } = props
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
        aria-label="add-file" 
        color={color}
        onClick={handleButtonClick}
        className={className}
        isLoading={isLoading}
      >
        <span className={spanClassName}>
          { startContentIcon }
          {text}
        </span>
      </Button>
      { 
        isInvalid 
          && <span className="text-xs text-red-700">
              {errorMessage}
            </span> 
      }
    </>
  )
}