import Card from '../Card'
import CardMenu from '../CardMenu'
import { deleteMeat } from '../../services/meats'
import { useState } from 'react'
import CardChipStatus from '../CardChipStatus'
import ActiveIcon from '../Icons/ActiveIcon'
import CloseIcon from '../Icons/CloseIcon'
import UpdateMeatForm from './UpdateMeatForm'
import CustomModal from '../CustomModal'
import EditIcon from '../Icons/EditIcon'
import { Button } from '@nextui-org/react'

export default function ListMeats(props) {
  const { data, user, refreshParent, refreshOneElement } = props


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
    <section className='py-5'>
      <ul className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {
          data?.map(meat => (
            <li key={meat.id} className='relative flex justify-end hover:scale-105 transition'>
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
                          : <CardChipStatus startContentIcon={<CloseIcon/>} text='Inactivo' color='danger'/>
                      }

                      <div className='flex flex-col gap-2'>
                        <CardMenu
                          itemId={meat.id}
                          courseIsActive={meat.is_active}
                          handleclickDelete={handleclick}
                          textModalDelete='Desea eliminar el producto seleccionado ?'
                          deleteIsError={deleteIsError}
                          isLoadingDelete={isLoadingDelete}
                        >

                          <CustomModal
                            btnText='Editar' 
                            headerText='Editar Curso'
                            btnOpen={<Button className='px-0 min-w-unit-10' color='warning' startContent={<EditIcon/>}/>}

                          >

                            <UpdateMeatForm 
                              meatId={meat.id}
                              refreshOneElement={refreshOneElement}
                            />
                            
                          </CustomModal>

                        </CardMenu>
                      </div>

                    </div>
              }

            </li>
          ))
        }
      </ul>
    
    </section>
  )
}