'use client'

import { formatDate } from 'date-fns'
import { Fragment } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useCadUnicoInfo } from '@/hooks/use-query/use-cad-unico-info'
import { usePerson } from '@/hooks/use-query/use-person'
import { usePublicTransportHistory } from '@/hooks/use-query/use-public-transport-history'
import { calculateAge } from '@/utils/calculate-age'

type cardContentItem =
  | {
      label: string
      value: string | number | undefined | null
    }
  | {
      label: string
      reactNode: React.ReactNode
    }

type Data = {
  cardTitle: string
  cardContent: cardContentItem[]
}[]

export function BasicInfo({ cpf }: { cpf: string }) {
  const { data: health, isPending: isHealthPending } = usePerson(cpf)
  const { data: transport } = usePublicTransportHistory(cpf)
  const { data: cadUnico, isPending: isCadUnicoPending } = useCadUnicoInfo(cpf)
  const citizen = {
    ...cadUnico,
    ...health,
    name: health?.social_name || health?.registration_name || 'N/A',
    age: health?.birth_date ? calculateAge(health?.birth_date) : 'N/A',
  }

  const data: Data = [
    {
      cardTitle: 'Dados Pessoais',
      cardContent: [
        {
          label: 'CPF',
          value: citizen.cpf,
        },
        {
          label: 'Idade',
          value: citizen.age,
        },
        {
          label: 'Telefone',
          value: citizen.phone,
        },
        {
          label: 'Óbito',
          value: citizen.deceased ? 'Sim' : undefined,
        },
        {
          label: 'Data de Nascimento',
          value: citizen.birth_date
            ? formatDate(citizen.birth_date, 'dd/MM/yyyy')
            : undefined,
        },
        {
          label: 'Sexo',
          value: citizen.gender === 'male' ? 'Masculino' : 'Feminino',
        },
        {
          label: 'Raça',
          value: citizen.race,
        },
      ],
    },
    {
      cardTitle: 'Saúde',
      cardContent: [
        {
          label: 'Unidade de Saúde',
          value: citizen.family_clinic?.name,
        },
      ],
    },
    {
      cardTitle: 'Família',
      cardContent:
        citizen?.membros?.map((item) => ({
          label: item.parentesco_responsavel_familia,
          value: item.nome,
        })) || [],
    },
    {
      cardTitle: 'Transporte',
      cardContent: [
        {
          label: 'Gratuidade',
          value: transport?.find((item) => item.tipo_transacao === 'Gratuidade')
            ? 'Sim'
            : 'Não',
        },
        {
          label: 'Tipo de Gratuidade',
          value: transport?.find((item) => item.tipo_transacao === 'Gratuidade')
            ?.tipo_gratuidade,
        },
      ],
    },
  ]

  return (
    <Card className="flex flex-col lg:w-1/3">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">{citizen.name}</h2>
            <p className="text-gray-500">
              {citizen.renda?.funcao_principal_trabalho}
            </p>
          </div>
        </div>
        {health && cadUnico && citizen && (
          <div className="space-y-4">
            {data.map((item, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle>{item.cardTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.cardContent.map((item, index) => (
                    <Fragment key={index}>
                      {'reactNode' in item
                        ? item.reactNode
                        : !!item.value && (
                            <p key={index}>
                              <strong>{item.label}:</strong> {item.value}
                            </p>
                          )}
                    </Fragment>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {(isHealthPending || isCadUnicoPending) && (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Carregando Dados...</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
