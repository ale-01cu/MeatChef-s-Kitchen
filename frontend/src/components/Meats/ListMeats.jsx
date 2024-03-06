import Card from '../Card'
import CardMenu from '../CardMenu'
import { deleteMeat } from '../../services/meats'
import { useState } from 'react'
import CardChipStatus from '../CardChipStatus'
import ActiveIcon from '../ActiveIcon'
import CloseIcon from '../CloseIcon'

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
    <section className='py-5 grid grid-cols-5 gap-5'>
      <ul>
        {
          data?.map(meat => (
            <li key={meat.id} className='relative flex justify-end'>
              <Card 
                image={meat.photo}
                name={meat.name_of_the_cut_of_meat}
                description={meat.description}
                btnText='Comprar'
                path={'/carnicos/' + meat.id}
              />

              { 
                user?.is_superuser
                  && <div className='absolute z-10 flex justify-between w-full'>
                      {
                        meat.is_active 
                          ? <CardChipStatus startContentIcon={<ActiveIcon/>} text='Activo' color='success'/>
                          : <CardChipStatus startContentIcon={<CloseIcon/>} text='Desactivado' color='danger'/>
                      }
                      <CardMenu
                        itemId={meat.id}
                        courseIsActive={meat.is_active}
                        handleclickDelete={handleclick}
                        textModalDelete='Desea eliminar el producto seleccionado ?'
                        deleteIsError={deleteIsError}
                        isLoadingDelete={isLoadingDelete}
                      >
                      </CardMenu>

                    </div>
              }

            </li>
          ))
        }
      </ul>
    
    </section>
  )
}