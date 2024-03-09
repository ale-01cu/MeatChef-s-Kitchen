// Icono de un avatar para el usuario que 
// no tiene foto de perfil
export default function AvatarIcon(props) {
  return (
    <svg 
      className="w-6 h-6 text-gray-800 dark:text-white" 
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 14 18"
      {...props}
    >
      <path 
        d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
    </svg>
  )
}