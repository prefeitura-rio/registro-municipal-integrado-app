import { formatDate } from 'date-fns'
import { Fragment } from 'react'

import { TypographyH3 } from '@/components/typography/h3'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useCadUnicoInfo } from '@/hooks/use-query/use-cad-unico-info'
import { usePerson } from '@/hooks/use-query/use-person'
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
  colSpan: number
  cardTitle: string
  cardContent: cardContentItem[]
}[]

export function SocialAssistance({ cpf }: { cpf: string }) {
  const { data: health, isPending: isHealthPending } = usePerson(cpf)
  const { data: cadUnico, isPending: isCadUnicoPending } = useCadUnicoInfo(cpf)
  const citizen = {
    ...cadUnico,
    ...health,
    name: health?.social_name || health?.registration_name || 'N/A',
    age: health?.birth_date ? calculateAge(health?.birth_date) : 'N/A',
  }

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
                  citizen.dados?.estado_cadastral ? 'success' : 'warning'
                }
              >
                {citizen.dados?.estado_cadastral}
              </Badge>
            </div>
          ),
        },
        {
          label: 'Data de Cadastro',
          value: citizen.dados?.data_cadastro
            ? formatDate(citizen.dados?.data_cadastro, 'dd/MM/y HH:mm:ss')
            : 'N/A',
        },
        {
          label: 'Última Atualização',
          value: citizen.dados?.data_cadastro
            ? formatDate(citizen.dados?.data_cadastro, 'dd/MM/y HH:mm:ss')
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
          value: citizen.renda?.renda_media_familia?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Outras Rendas',
          value: citizen.renda?.renda_outras_rendas?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Renda do Emprego no Último Mês',
          value: citizen.renda?.renda_emprego_ultimo_mes?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Renda de Aposentadoria',
          value: citizen.renda?.renda_aposentadoria?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Renda Bruta dos Últimos 12 Meses',
          value: citizen.renda?.renda_bruta_12_meses?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Renda de Doações',
          value: citizen.renda?.renda_doacao?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        },
        {
          label: 'Pensão Alimentícia',
          value: citizen.renda?.renda_pensao_alimenticia?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Seguro Desemprego',
          value: citizen.renda?.renda_seguro_desemprego?.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            },
          ),
        },
        {
          label: 'Recebe Remuneração',
          value: citizen.renda?.nao_recebe_remuneracao === 1 ? 'Não' : 'Sim',
        },
        {
          label: 'Função Principal no Trabalho',
          value: citizen.renda?.funcao_principal_trabalho,
        },
      ],
    },
    {
      colSpan: 2,
      cardTitle: 'Domicílio',
      cardContent: [
        {
          label: 'Espécie do Domicílio',
          value: citizen.domicilio?.especie_domicilio,
        },
        {
          label: 'Iluminação',
          value: citizen.domicilio?.iluminacao,
        },
        {
          label: 'Cômodos',
          value: citizen.domicilio?.comodos,
        },
        {
          label: 'Forma de Abastecimento de Água',
          value: citizen.domicilio?.forma_abastecimento_agua,
        },
        {
          label: 'Possui Água Encanada',
          value: citizen.domicilio?.possui_agua_encanada,
        },
        {
          label: 'Escoamento Sanitário',
          value: citizen.domicilio?.escoamento_sanitario,
        },
        {
          label: 'Local',
          value: citizen.domicilio?.local,
        },
        {
          label: 'Despesa com Água e Esgoto',
          value: citizen.domicilio?.despesa_agua_esgoto,
        },
        {
          label: 'Despesa com Alimentação',
          value: citizen.domicilio?.despesa_alimentacao,
        },
        {
          label: 'Despesa com Aluguel',
          value: citizen.domicilio?.despesa_aluguel,
        },
        {
          label: 'Despesa com Energia',
          value: citizen.domicilio?.despesa_energia,
        },
        {
          label: 'Despesa com Gás',
          value: citizen.domicilio?.despesa_gas,
        },
        {
          label: 'Despesa com Transporte',
          value: citizen.domicilio?.despesa_transporte,
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
        {(isHealthPending || isCadUnicoPending) && (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Carregando Dados...</span>
          </div>
        )}
      </div>
    </div>
  )
}
