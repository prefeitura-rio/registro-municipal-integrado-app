import { TypographyH3 } from '@/components/typography/h3'

// import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { DynamicMapboxStaticMap } from './components/map'
import { TransportTable } from './components/table'

export function Transportation({ cpf }: { cpf: string }) {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-3 flex justify-between">
        <TypographyH3>Histórico de Transporte Público</TypographyH3>
        {/* <DatePickerWithRange /> */}
      </div>

      <div className="flex flex-col gap-4">
        <DynamicMapboxStaticMap cpf={cpf} />
        <TransportTable cpf={cpf} />
      </div>
    </div>
  )
}
