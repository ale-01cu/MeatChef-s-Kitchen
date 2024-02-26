import { useRef } from "react"

export default function InputFile(props) {
  const { fileAccept, handleChange, text, name, value } = props
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
      <button 
        type="button"
        aria-label="add-publication" 
        color='primary'
        onClick={handleButtonClick}
      >
        {text}
      </button>
    </>
  )
}