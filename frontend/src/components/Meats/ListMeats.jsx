import Card from '../Card'
import CardMenu from '../CardMenu'
import { deleteMeat } from '../../services/meats'
import CustomModal from '../CustomModal'
import { useState } from 'react'

export default function ListMeats(props) {
  const { data, user, refreshParent } = props


  const [ deleteIsError, setDeleteIsError ] = useState(null)
  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)


  const handleclick = (meatId, onClose) => {
    setIsLoadingDelete(true)
    deleteMeat(meatId)
      .then(() => {
        onClose()
        refreshParent(prev => prev+=1)
      })
      .catch(e => {
        console.error(e)
        setDeleteIsError(e)
      })
      .finally(() => setIsLoadingDelete(false))
  }

  return (
    <>
      <ul>
        {
          data?.map(meat => (
            <li key={meat.id}>
              <Card 
                image={meat.photo}
                name={meat.name_of_the_cut_of_meat}
                description={meat.description}
                btnText='Comprar'
                path='#'
              />

              { 
                user?.is_superuser
                  && <CardMenu
                      itemId={meat.id}
                      courseIsActive={meat.is_active}
                      handleclickDelete={handleclick}
                      textModalDelete='Desea eliminar el producto seleccionado ?'
                      deleteIsError={deleteIsError}
                      isLoadingDelete={isLoadingDelete}
                    >
                    </CardMenu>
              }

            </li>
          ))
        }
      </ul>
    
    </>
  )
}