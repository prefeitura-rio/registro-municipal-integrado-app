'use client'

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Interaction1746 } from '@/types/entities'

interface DashboardData {
  data: Interaction1746[]
}

export function Dashboard({ data }: DashboardData) {
  const totalIncidents = data.length
  const onGoingIncidents = data.filter(
    (item) => item.tipo_situacao === 'Andamento',
  ).length
  const subtypeOccurences = data.reduce(
    (acc, cur) => {
      if (acc[cur.subtipo]) {
        acc[cur.subtipo] += 1
      } else {
        acc[cur.subtipo] = 1
      }
      return acc
    },
    {} as Record<string, number>,
  )
  console.log({ subtypeOccurences })
  const sortedSubtypeOccurences = Object.entries(subtypeOccurences)
    .sort((a, b) => b[1] - a[1])
    .map((i) => ({
      subtipo: i[0],
      count: i[1],
    }))
  console.log({ sortedSubtypeOccurences })
  const top5Subtypes = sortedSubtypeOccurences.slice(0, 5)
  console.log({ top5Subtypes })

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Chamados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIncidents}</div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Chamados em Andamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{onGoingIncidents}</div>
        </CardContent>
      </Card>
      <div className="col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Reclamações</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={top5Subtypes} layout="vertical">
              <XAxis type="number" allowDecimals={false} hide />
              <YAxis dataKey="subtipo" type="category" width={250} />
              <Bar dataKey="count" fill="#8884d8">
                <LabelList
                  dataKey="count"
                  position="insideRight"
                  offset={8}
                  className="fill-accent-foreground"
                  fontSize={18}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </div>
  )
}
