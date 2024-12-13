'use client'

import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { TypographyH3 } from '@/components/typography/h3'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'

const cardsData = [
  { title: 'Pessoas cadastradas', value: 4.8, unit: 'Milhões' },
  { title: 'Registros clínicos', value: 1.3, unit: 'Milhões' },
  {
    title: 'Demandas',
    description: 'nos cais de atendimento da prefeitura',
    value: 4.8,
    unit: 'Milhões',
  },
  { title: 'Famílias no CadÚnico', value: 4.8, unit: 'Milhões' },
  { title: 'Bilhetagens do JAÉ', value: 4.8, unit: 'Milhões' },
]

// const tableData = [
//   {
//     Secretaria: 'Secretaria do Transporte',
//     Dados: 'Bilhetagens no JAÉ',
//     Status: 'Disponível',
//   },
//   {
//     Secretaria: 'Secretaria da Educação',
//     Dados: '',
//     Status: 'Sem dados',
//   },
//   {
//     Secretaria: 'Secretaria da Saúde',
//     Dados: 'Histórico Clínico',
//     Status: 'Sem dados',
//   },
// ]

const secretarias = [
  {
    name: 'Saúde',
    integrationProgress: 75,
    dataCategories: [
      { name: 'Registros de Pacientes', status: 'integrated' },
      { name: 'Histórico de Vacinação', status: 'integrated' },
      { name: 'Agendamentos', status: 'pending' },
      { name: 'Estoque de Medicamentos', status: 'not-started' },
    ],
  },
  {
    name: 'Educação',
    integrationProgress: 60,
    dataCategories: [
      { name: 'Matrículas Escolares', status: 'integrated' },
      { name: 'Notas dos Alunos', status: 'integrated' },
      { name: 'Frequência Escolar', status: 'pending' },
      { name: 'Transporte Escolar', status: 'not-started' },
    ],
  },
  {
    name: 'Transporte',
    integrationProgress: 40,
    dataCategories: [
      { name: 'Rotas de Ônibus', status: 'integrated' },
      { name: 'Bilhetagem Eletrônica', status: 'pending' },
      { name: 'Manutenção de Veículos', status: 'not-started' },
      { name: 'Semáforos Inteligentes', status: 'not-started' },
    ],
  },
  {
    name: 'Assistência Social',
    integrationProgress: 80,
    dataCategories: [
      { name: 'Cadastro Único', status: 'integrated' },
      { name: 'Programas Sociais', status: 'integrated' },
      { name: 'Atendimentos Realizados', status: 'integrated' },
      { name: 'Abrigos Municipais', status: 'pending' },
    ],
  },
]

export default function Page() {
  return (
    <div className="page p-6">
      <BreadcrumbHeader items={[{ label: 'Início' }]} />
      <TypographyH3 className="mb-3">Visão Geral de Integração</TypographyH3>
      <div className="grid grid-cols-3 gap-6 xl:grid-cols-5">
        {cardsData.map((card, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              {card.description && (
                <CardDescription>{card.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="">
              <span className="stracking-tight text-6xl font-bold">
                {card.value}
              </span>
              <span className="text-sm font-bold">{card.unit}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Secretaria</TableHead>
            <TableHead>Dados</TableHead>
            <TableHead className="text-right">Situação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.Secretaria}</TableCell>
              <TableCell>{row.Dados}</TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    row.Status === 'Disponível' ? 'success' : 'destructive'
                  }
                >
                  {row.Status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <div className="mt-10 grid grid-cols-2 gap-6 xl:grid-cols-3">
        {secretarias.map((secretaria) => (
          <Card key={secretaria.name}>
            <CardHeader>
              <CardTitle>{secretaria.name}</CardTitle>
              {/* <CardDescription>Detalhes da integração de dados</CardDescription> */}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {secretaria.dataCategories.map((category) => (
                  <li
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    <Badge
                      variant={
                        category.status === 'integrated'
                          ? 'success'
                          : category.status === 'pending'
                            ? 'warning'
                            : 'destructive'
                      }
                    >
                      {category.status === 'integrated' && (
                        <CheckCircle className="mr-1 h-4 w-4" />
                      )}
                      {category.status === 'pending' && (
                        <AlertCircle className="mr-1 h-4 w-4" />
                      )}
                      {category.status === 'not-started' && (
                        <XCircle className="mr-1 h-4 w-4" />
                      )}
                      {category.status === 'integrated'
                        ? 'Integrado'
                        : category.status === 'pending'
                          ? 'Pendente'
                          : 'Não Iniciado'}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
