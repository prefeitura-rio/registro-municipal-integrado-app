import { formatDate } from 'date-fns'

import { TableSkeleton } from '@/components/table-skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePublicTransportHistory } from '@/hooks/use-query/use-public-transport-history'

export function TransportTable({ cpf }: { cpf: string }) {
  const { data, isPending } = usePublicTransportHistory(cpf)

  if (isPending) {
    return <TableSkeleton />
  } else {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Modo</TableHead>
              <TableHead>Linha</TableHead>
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
                  {formatDate(event.datetime_transacao, 'HH:mm:ss')}
                </TableCell>
                <TableCell>{event.modo}</TableCell>
                <TableCell>{event.servico_jae}</TableCell>
                <TableCell>{event.descricao_servico_jae}</TableCell>
                <TableCell className="text-nowrap">
                  R$ {event.valor_transacao.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data && data.length === 0 && (
          <span className="text-center text-sm text-muted-foreground">
            Nenhum registro
          </span>
        )}
      </>
    )
  }
}
