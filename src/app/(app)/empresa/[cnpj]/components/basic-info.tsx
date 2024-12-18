'use client'

import { Fragment } from 'react'

import { TypographyH6 } from '@/components/typography/h6'
import { Spinner } from '@/components/ui/spinner'
import { useCompanyHistory } from '@/hooks/use-query/use-company-history'
import { formatCNPJ, formatPhone } from '@/utils/string-formatters'

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
  visible: boolean
}[]

export function BasicInfo({ cnpj }: { cnpj: string }) {
  const { data: companyHistory, isPending } = useCompanyHistory(cnpj)
  const company = companyHistory?.at(0)

  const data: Data = [
    {
      cardTitle: 'Dados Básicos',
      visible: true,
      cardContent: [
        {
          label: 'CNPJ',
          value: cnpj,
        },
        {
          label: 'Telefone',
          value: formatPhone(`${company?.ddd_1}${company?.telefone_1}`),
        },
        {
          label: 'E-mail',
          value: company?.email,
        },
        {
          label: 'CEP',
          value: company?.cep,
        },
        {
          label: 'Logradouro',
          value: company?.logradouro,
        },
        {
          label: 'Número',
          value: company?.numero,
        },
        {
          label: 'Complemento',
          value: company?.complemento,
        },
        {
          label: 'Bairro',
          value: company?.bairro,
        },
      ],
    },
    ...(company?.cnae?.map(
      (cnae) =>
        cnae && {
          cardTitle: `CNAE ${cnae?.cnae}`,
          visible: true,
          cardContent: [
            {
              label: 'Classe',
              value: cnae.descricao_classe,
            },
            {
              label: 'Subclasse',
              value: cnae.descricao_subclasse,
            },
            {
              label: 'Grupo',
              value: cnae.descricao_grupo,
            },
            {
              label: 'Divisão',
              value: cnae.descricao_divisao,
            },
            {
              label: 'Seção',
              value: cnae.descricao_secao,
            },
          ],
        },
    ) || []),
  ]

  return (
    <div className="flex flex-col rounded-none">
      <div className="flex-grow overflow-auto p-6">
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">
              {company?.nome_fantasia || formatCNPJ(company?.cnpj || '')}
            </h2>
            <p className="text-gray-500">{company?.pais}</p>
          </div>
        </div>
        {company && (
          <div className="space-y-4">
            {data.map(
              (item, index) =>
                item.visible && (
                  <div key={index} className="w-full">
                    <TypographyH6>{item.cardTitle}</TypographyH6>
                    <div className="ml-4">
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
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
        {isPending && (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Carregando Dados...</span>
          </div>
        )}
      </div>
    </div>
  )
}
