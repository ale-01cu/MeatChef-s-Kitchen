import { RadioGroup, Radio, Textarea } from "@nextui-org/react"

export default function OrderForm() {
  return (
    <form id="form-order" className="flex sm:flex-col justify-center gap-x-2 gap-y-2">
      <div className="p-8 flex flex-col gap-y-5 bg-white rounded-xl">
        <RadioGroup label="Tipo de Entrega" classNames={{
          label: 'text-black text-xl font-semibold'
        }}>
          <Radio value="recogida=tienda" classNames={{
            label: 'text-black'
          }}>Recogida en Tienda</Radio>
          <Radio value="envio" classNames={{
            label: 'text-black'
          }}>Envio</Radio>
        </RadioGroup>

        <Textarea
          isRequired
          label="Dirección"
          labelPlacement="outside"
          placeholder="Escriba su dirección"
          className="max-w-xs"
          maxRows={3}
          variant="bordered"
          classNames={{
            label: 'group-data-[filled-within=true]:text-black',
            input: 'text-black'
          }}
        />

      </div>

      <div className="p-8 flex flex-col gap-y-5 bg-white rounded-xl">
        <RadioGroup 
          label="Metodo de Pago"
          classNames={{
            label: 'text-black text-xl font-semibold'
          }}
        >
          <Radio 
            value="buenos-aires"
            classNames={{
              label: 'text-black'
            }}
          >
              Efectivo en Tienda
            </Radio>
          <Radio 
            value="tokyo"
            classNames={{
              label: 'text-black'
            }}
          >
            Targeta de Crédito
          </Radio>
        </RadioGroup>
      </div>


    </form>
  )
}