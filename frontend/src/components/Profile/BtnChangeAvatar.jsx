import InputFile from "../Inputs/InputFile"
import CameraIcon from "../Icons/CameraIcon"

export default function BtnChangeAvatar({ handleChange, isLoading }) {
  return (
    <InputFile
      fileAccept='image/jpeg, image/png' 
      name='avatar'
      startContentIcon={<CameraIcon/>}
      color='primary'
      handleChange={handleChange}
      isLoading={isLoading}
      className='w-12 rounded-full flex justify-center items-center h-12 px-0 min-w-unit-10 absolute bottom-2 right-4'
    />
  )
}