import DataTable, { createTheme } from 'react-data-table-component'

const columns = [ 
  'Id', 
  'Estado', 
  'Tipo de Envio', 
  'Metodo de Pago', 
  'Fecha de Creado' 
]

const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export default function OrdersList({ orders }) {
 
  return (
    <div className='w-full'>
      {/* <div className='grid grid-cols-5'>
        {
          columns.map((col) => (
            <span key={col} className='p-4'>{col}</span>
          ))
        }
      </div>
      <ul>
        {
          orders.map((order) => (
            <li key={order.id} className='grid grid-cols-5'>
              <span className='p-4'>{order.id}</span>
              <span className='p-4'>{order.status}</span>
              <span className='p-4'>{order.delivery_type}</span>
              <span className='p-4'>{order.payment_method}</span>
              <span className='p-4'>{order.createAt}</span>
            </li>
          ))
        }
      </ul> */}
      <DataTable
        className=''
        columns={[
          { name: 'Id', selector: row => row.id },
          { name: 'Estado', selector: row => row.status },
          { name: 'Tipo de Envio', selector: row => row.delivery_type },
          { name: 'Metodo de Pago', selector: row => row.payment_method },
          { name: 'Fecha de Creado', selector: row => new Date(row.createAt).toLocaleDateString('es-ES', opciones)}
        ]}
        data={orders}
        theme="dark"
      />
    </div>
  )
}