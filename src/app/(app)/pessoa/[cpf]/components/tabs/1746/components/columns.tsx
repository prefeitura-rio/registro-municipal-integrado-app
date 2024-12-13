import type { ColumnDef } from '@tanstack/react-table'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Interaction1746 } from '@/types/entities'

export const columns: ColumnDef<Interaction1746>[] = [
  {
    accessorKey: 'id_chamado',
    header: 'ID',
  },
  {
    accessorKey: 'data_inicio',
    header: 'Data de Início',
    cell: ({ row }) => {
      return new Date(row.getValue('data_inicio')).toLocaleDateString('pt-BR')
    },
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
  },
  {
    accessorKey: 'subtipo',
    header: 'Subtipo',
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <p className="line-clamp-1">{row.original.descricao}</p>
        </TooltipTrigger>
        <TooltipContent className="w-96 p-6">
          <p>{row.original.descricao}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'tipo_situacao',
    header: 'Situação',
  },
]
