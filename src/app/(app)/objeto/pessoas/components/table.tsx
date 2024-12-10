'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Pagination } from '@/components/ui/pagination'
import { usePeople } from '@/hooks/use-query/use-people'
import type { Person } from '@/types/entities'
import { calculateAge } from '@/utils/calculate-age'

export function Table() {
  const { data, isPending } = usePeople()
  const router = useRouter()

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'cpf',
      header: 'CPF',
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
    },
    {
      accessorKey: 'phone',
      header: 'Telefone',
    },
    {
      accessorKey: 'bithday',
      header: 'Idade',
      cell: ({ row }) => calculateAge(row.original.bithday),
    },
    {
      accessorKey: 'mostFrequentBus',
      header: 'Ônibus mais frequente',
    },
    {
      header: 'Ações',
      cell: ({ row }) => (
        <Button
          variant="secondary"
          size="icon"
          onClick={() =>
            router.push(
              `/objeto/pessoa/${row.original.cpf.replaceAll('.', '').replace('-', '')}`,
            )
          }
        >
          <ChevronRight />
        </Button>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <DataTable
        columns={columns}
        data={data?.items || []}
        isLoading={isPending}
      />
      {data && (
        <Pagination
          page={data.page}
          total={data.total}
          size={data.size}
          onPageChange={() => console.log('page change')}
        />
      )}
    </div>
  )
}
