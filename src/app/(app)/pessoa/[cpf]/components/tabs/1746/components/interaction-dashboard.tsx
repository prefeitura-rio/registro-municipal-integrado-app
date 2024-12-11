'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Interaction {
  id_chamado: string
  data_inicio: string
  tipo: string
  status: string
  dentro_prazo: string
}

interface InteractionDashboardProps {
  interactions: Interaction[]
}

export default function InteractionDashboard({
  interactions,
}: InteractionDashboardProps) {
  const totalInteractions = interactions.length
  const completedInteractions = interactions.filter(
    (i) => i.status === 'Concluído',
  ).length
  const withinDeadlineInteractions = interactions.filter(
    (i) => i.dentro_prazo === 'Sim',
  ).length

  const interactionsByType = interactions.reduce(
    (acc, interaction) => {
      acc[interaction.tipo] = (acc[interaction.tipo] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(interactionsByType)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Interações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInteractions}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Interações Concluídas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedInteractions}</div>
          <p className="text-xs text-muted-foreground">
            {((completedInteractions / totalInteractions) * 100).toFixed(1)}% do
            total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dentro do Prazo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{withinDeadlineInteractions}</div>
          <p className="text-xs text-muted-foreground">
            {((withinDeadlineInteractions / totalInteractions) * 100).toFixed(
              1,
            )}
            % do total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Top Tipos de Interações
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={chartData}>
              <XAxis dataKey="type" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
