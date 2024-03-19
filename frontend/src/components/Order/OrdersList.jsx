import React, { useState } from 'react';
import DataTable from 'react-data-table-component'
import ListMeats from '../Meats/ListMeats'


export default function OrdersList(props) {
  const { orders, columns, atributes, children, handleSubmit } = props
  const [ selectedRowsState, setSelectedRowsState ] = useState([])

  const handleChange = ({ selectedRows }) => {
    setSelectedRowsState(selectedRows)
  };
 
  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={orders}
        { ...atributes }
        theme="dark"
        onSelectedRowsChange={handleChange}
        expandableRowsComponent={({ data }) => {
          if(data.type === "Estandar") 
            return (
              <div className='p-5'>
                <ListMeats 
                  data={data.standard_order_items.map(
                    (meat) => meat.meat_product)} 
                />
              </div>
            )
          return (
            <h3 className='p-5 text-yellow-500'>
              Los Pedidos Personalizados no tienen Productos.
            </h3>
          )
        }}
      />
      <div className='p-5 flex justify-end'>
      {
        React.isValidElement(children) &&
          React.cloneElement(
            children, 
            { 
              isDisabled: selectedRowsState.length == 0 ? true : false, 
              onPress: () => handleSubmit(selectedRowsState) 
            }
          )
      }

      </div>
    </div>
  )
}