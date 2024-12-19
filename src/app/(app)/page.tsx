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

const cardsData = [
  { title: 'Pessoas Cadastradas', value: 7.8, unit: 'Milhões' },
  { title: 'Registros Clínicos', value: 100, unit: 'Milhões' },
  {
    title: 'Demandas',
    description: 'nos cais de atendimento da prefeitura',
    value: 24.7,
    unit: 'Milhões',
  },
  { title: 'Famílias no CadÚnico', value: 1.7, unit: 'Milhão' },
  { title: 'Bilhetagens do JAÉ', value: 2.6, unit: 'Milhões' },
]

const secretarias = [
  {
    name: 'Saúde',
    dataCategories: [
      { name: 'Histórico Clínico', status: 'Integrado' },
      { name: 'Histórico de Vacinação', status: 'Integrado' },
      { name: 'Medicamentos Retirados', status: 'Pendente' },
      {
        name: 'Alvará e Multas da Vigilância Sanitária',
        status: 'Indisponível',
      },
    ],
  },
  {
    name: 'Educação',
    dataCategories: [
      { name: 'Matrículas Escolares', status: 'Indisponível' },
      { name: 'Histórico Escolar', status: 'Indisponível' },
      { name: 'Frequência Escolar', status: 'Indisponível' },
    ],
  },
  {
    name: 'Transporte',
    dataCategories: [
      { name: 'Bilhetagem JAÉ', status: 'Integrado' },
      { name: 'Bilhetagem RioCard', status: 'Pendente' },
    ],
  },
  {
    name: 'Assistência Social',
    dataCategories: [
      { name: 'Cadastro Único', status: 'Integrado' },
      { name: 'Programa Seguir em Frente', status: 'Indisponível' },
    ],
  },
  {
    name: 'Serviços',
    dataCategories: [
      { name: '1746', status: 'Integrado' },
      { name: 'Carioca Digital', status: 'Indisponível' },
    ],
  },
  {
    name: 'Fazenda',
    dataCategories: [
      { name: 'Ergon', status: 'Pendente' },
      { name: 'ISS', status: 'Indisponível' },
      { name: 'Nota Carioca', status: 'Indisponível' },
      { name: 'IPTU', status: 'Indisponível' },
      { name: 'ITBI', status: 'Indisponível' },
    ],
  },
  {
    name: 'Segurança',
    dataCategories: [
      { name: 'Histórico Criminal', status: 'Indisponível' },
      { name: 'Maria da Penha', status: 'Indisponível' },
    ],
  },
]

export default function Page() {
  return (
    <div className="page overflow-y-auto">
      <BreadcrumbHeader items={[{ label: 'Início' }]} />
      <TypographyH3 className="mb-6 px-4">
        Visão Geral de Integração
      </TypographyH3>
      <div className="grid grid-cols-3 gap-6 px-4 xl:grid-cols-5">
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

      <div className="mt-10 grid grid-cols-2 gap-6 px-4 xl:grid-cols-3">
        {secretarias.map((secretaria) => (
          <Card key={secretaria.name}>
            <CardHeader>
              <CardTitle>{secretaria.name}</CardTitle>
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
                        category.status === 'Integrado'
                          ? 'success'
                          : category.status === 'Pendente'
                            ? 'warning'
                            : 'destructive'
                      }
                    >
                      {category.status === 'Integrado' && (
                        <CheckCircle className="mr-1 h-4 w-4" />
                      )}
                      {category.status === 'Pendente' && (
                        <AlertCircle className="mr-1 h-4 w-4" />
                      )}
                      {category.status === 'Indisponível' && (
                        <XCircle className="mr-1 h-4 w-4" />
                      )}
                      <span className="text-nowrap">{category.status}</span>
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
