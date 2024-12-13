import { format, formatDate } from 'date-fns'

import { TypographyH3 } from '@/components/typography/h3'
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePublicTransportHistory } from '@/hooks/use-query/use-public-transport-history'

export function Transportation({ cpf }: { cpf: string }) {
  const { data, isPending } = usePublicTransportHistory(cpf)

  return (
    <div className="container mx-auto p-4">
      <div className="mb-3 flex justify-between">
        <TypographyH3>Histórico de Transporte Público</TypographyH3>
        <DatePickerWithRange />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Modo</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((event, index) => (
            <TableRow key={index}>
              <TableCell>
                {formatDate(event.datetime_transacao, 'dd/MM/y')}
              </TableCell>
              <TableCell>
                {format(event.datetime_transacao, 'HH:mm:ss')}
              </TableCell>
              <TableCell>{event.modo}</TableCell>
              <TableCell>{event.descricao_servico_jae}</TableCell>
              <TableCell className="text-nowrap">
                R$ {event.valor_transacao.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isPending && (
        <div className="mt-3 flex items-center gap-2">
          <Spinner />
          <span className="text-muted-foreground">Carregando histórico...</span>
        </div>
      )}
    </div>
  )
}
