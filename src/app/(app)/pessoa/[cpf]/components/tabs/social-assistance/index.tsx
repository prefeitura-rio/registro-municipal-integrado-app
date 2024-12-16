import { formatDate } from 'date-fns'
import { Fragment } from 'react'

import { TypographyH3 } from '@/components/typography/h3'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useCadUnicoInfo } from '@/hooks/use-query/use-cad-unico-info'

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
  colSpan: number
  cardTitle: string
  cardContent: cardContentItem[]
}[]

export function SocialAssistance({ cpf }: { cpf: string }) {
  const { data: cadUnico, isPending: isCadUnicoPending } = useCadUnicoInfo(cpf)

  const data: Data = [
    {
      colSpan: 1,
      cardTitle: 'Situação no CadÚnico',
      cardContent: [
        {
          label: 'Estado Cadastral',
          reactNode: (
            <div className="flex gap-2">
              <strong>Estado Cadastral:</strong>
              <Badge
                variant={
                  cadUnico?.dados?.estado_cadastral ? 'success' : 'warning'
                }
              >
                {cadUnico?.dados?.estado_cadastral}
              </Badge>
            </div>
          ),
        },
        {
          label: 'Data de Cadastro',
          value: cadUnico?.dados?.data_cadastro
            ? formatDate(cadUnico?.dados?.data_cadastro, 'dd/MM/y HH:mm:ss')
            : 'N/A',
        },
        {
          label: 'Última Atualização',
          value: cadUnico?.dados?.data_cadastro
            ? formatDate(cadUnico?.dados?.data_cadastro, 'dd/MM/y HH:mm:ss')
            : 'N/A',
        },
      ],
    },
    {
      colSpan: 1,
      cardTitle: 'Renda',
      cardContent: [
        {
          label: 'Renda Média Familiar',
          value: cadUnico?.renda?.renda_media_familia?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Outras Rendas',
          value: cadUnico?.renda?.renda_outras_rendas?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Renda do Emprego no Último Mês',
          value: cadUnico?.renda?.renda_emprego_ultimo_mes?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Renda de Aposentadoria',
          value: cadUnico?.renda?.renda_aposentadoria?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Renda Bruta dos Últimos 12 Meses',
          value: cadUnico?.renda?.renda_bruta_12_meses?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Renda de Doações',
          value: cadUnico?.renda?.renda_doacao?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Pensão Alimentícia',
          value: cadUnico?.renda?.renda_pensao_alimenticia?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Seguro Desemprego',
          value: cadUnico?.renda?.renda_seguro_desemprego?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Recebe Remuneração',
          value: cadUnico?.renda?.nao_recebe_remuneracao === 1 ? 'Não' : 'Sim',
        },
        {
          label: 'Função Principal no Trabalho',
          value: cadUnico?.renda?.funcao_principal_trabalho,
        },
      ],
    },
    {
      colSpan: 2,
      cardTitle: 'Domicílio',
      cardContent: [
        {
          label: 'Espécie do Domicílio',
          value: cadUnico?.domicilio?.especie_domicilio,
        },
        {
          label: 'Iluminação',
          value: cadUnico?.domicilio?.iluminacao,
        },
        {
          label: 'Cômodos',
          value: cadUnico?.domicilio?.comodos,
        },
        {
          label: 'Forma de Abastecimento de Água',
          value: cadUnico?.domicilio?.forma_abastecimento_agua,
        },
        {
          label: 'Possui Água Encanada',
          value: cadUnico?.domicilio?.possui_agua_encanada,
        },
        {
          label: 'Escoamento Sanitário',
          value: cadUnico?.domicilio?.escoamento_sanitario,
        },
        {
          label: 'Local',
          value: cadUnico?.domicilio?.local,
        },
        {
          label: 'Despesa com Água e Esgoto',
          value: cadUnico?.domicilio?.despesa_agua_esgoto,
        },
        {
          label: 'Despesa com Alimentação',
          value: cadUnico?.domicilio?.despesa_alimentacao,
        },
        {
          label: 'Despesa com Aluguel',
          value: cadUnico?.domicilio?.despesa_aluguel,
        },
        {
          label: 'Despesa com Energia',
          value: cadUnico?.domicilio?.despesa_energia,
        },
        {
          label: 'Despesa com Gás',
          value: cadUnico?.domicilio?.despesa_gas,
        },
        {
          label: 'Despesa com Transporte',
          value: cadUnico?.domicilio?.despesa_transporte,
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <TypographyH3 className="mb-3">Dados do CadÚnico</TypographyH3>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((item, index) => (
          <Card key={index} className={`col-span-${item.colSpan} w-full`}>
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
        {isCadUnicoPending && (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Carregando Dados...</span>
          </div>
        )}
      </div>
    </div>
  )
}
