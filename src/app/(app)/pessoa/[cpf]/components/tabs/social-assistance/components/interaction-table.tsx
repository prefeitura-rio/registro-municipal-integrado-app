'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Interaction {
  id_chamado: string
  data_inicio: string
  tipo: string
  subtipo: string
  status: string
  dentro_prazo: string
}

interface InteractionTableProps {
  interactions: Interaction[]
}

const columns: ColumnDef<Interaction>[] = [
  {
    accessorKey: 'id_chamado',
    header: 'ID',
  },
  {
    accessorKey: 'data_inicio',
    header: 'Data de Início',
    cell: ({ row }) => {
      return new Date(row.getValue('data_inicio')).toLocaleDateString()
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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'dentro_prazo',
    header: 'Dentro do prazo',
  },
]

export default function InteractionTable({
  interactions,
}: InteractionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: interactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {interactions.length > 10 && (
        <Pagination
          className="mt-4"
          page={1}
          onPageChange={() => {}}
          size={10}
          total={interactions.length}
        />
      )}
    </div>
  )
}
