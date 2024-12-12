import { TypographyH3 } from '@/components/typography/h3'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { use1746Reports } from '@/hooks/use-query/use-1746-reports'

import { columns } from './components/columns'
import { Dashboard } from './components/dashboard'

export function Servico1746({ cpf }: { cpf: string }) {
  const { data: reports1746, isPending } = use1746Reports(cpf)

  return (
    <div className="container mx-auto p-4">
      <TypographyH3 className="mb-3">
        Interações com o Serviço 1746
      </TypographyH3>
      {reports1746 && <Dashboard data={reports1746} />}
      {isPending && <div>Carregando dashboard...</div>}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Histórico de Interações</CardTitle>
          <CardDescription>
            Lista detalhada de todas as interações com o serviço 1746
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports1746 && (
            <DataTable
              isLoading={false}
              pagination
              columns={columns}
              data={reports1746}
            />
          )}
          {isPending && <div>Carregando tabela...</div>}
        </CardContent>
      </Card>
    </div>
  )
}
