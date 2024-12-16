'use client'

import { formatDate } from 'date-fns'
import Link from 'next/link'
import { Fragment } from 'react'

import { Button } from '@/components/ui/button'
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

  const data: Data = [
    {
      cardTitle: 'Dados Pessoais',
      cardContent: [
        {
          label: 'CPF',
          value: cpf,
        },
        {
          label: 'Idade',
          value: health?.dados?.data_nascimento
            ? calculateAge(health?.dados.data_nascimento)
            : 'N/A',
        },
        {
          label: 'Óbito',
          value: health?.dados?.obito_indicador ? 'Sim' : undefined,
        },
        {
          label: 'Data de Nascimento',
          value: health?.dados?.data_nascimento
            ? formatDate(health?.dados?.data_nascimento, 'dd/MM/yyyy')
            : undefined,
        },
        {
          label: 'Sexo',
          value:
            health?.dados?.genero === 'male'
              ? 'Masculino'
              : health?.dados?.genero === 'female'
                ? 'Feminino'
                : health?.dados?.genero,
        },
        {
          label: 'Raça',
          value: health?.dados?.raca,
        },
        {
          label: 'Endereço',
          value: `${health?.endereco?.at(0)?.tipo_logradouro} ${health?.endereco?.at(0)?.logradouro} ${health?.endereco?.at(0)?.numero || 'S/N'}, ${health?.endereco?.at(0)?.bairro}`,
        },
        {
          label:
            health?.contato?.telefone && health?.contato?.telefone?.length > 1
              ? 'Telefones'
              : 'Telefone',
          value: health?.contato?.telefone.map((item) => item.valor).join(', '),
        },
        {
          label:
            health?.contato?.email && health?.contato?.email?.length > 1
              ? 'E-mails'
              : 'E-mail',
          value: health?.contato?.email.map((item) => item.valor).join(', '),
        },
      ],
    },
    {
      cardTitle: 'Saúde',
      cardContent: [
        {
          label: 'Unidade de Saúde',
          value: health?.equipe_saude_familia?.at(0)?.clinica_familia.nome,
        },
      ],
    },
    {
      cardTitle: 'Transporte',
      cardContent: [
        {
          label: 'Gratuidade',
          value:
            transport?.find((item) => item.tipo_transacao === 'Gratuidade')
              ?.tipo_gratuidade || 'Não',
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
            <h2 className="text-2xl font-bold">
              {health?.dados?.nome_social || health?.dados?.nome || 'N/A'}
            </h2>
            <p className="text-gray-500">
              {cadUnico?.renda?.funcao_principal_trabalho}
            </p>
          </div>
        </div>
        {health && cadUnico && (
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
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Família</CardTitle>
              </CardHeader>
              <CardContent>
                {cadUnico?.membros.map((member, index) => (
                  <Button
                    key={index}
                    variant="link"
                    className="block h-auto p-0"
                  >
                    <Link href={`/pessoa/${member.cpf}`}>{member.nome}</Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
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
