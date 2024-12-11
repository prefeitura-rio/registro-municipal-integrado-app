import { Suspense } from 'react'

import { TypographyH3 } from '@/components/typography/h3'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import InteractionDashboard from './components/interaction-dashboard'
import InteractionTable from './components/interaction-table'

export function SocialAssistance() {
  const data = [
    {
      id_chamado: 'CH123456',
      id_origem_ocorrencia: 'OC987654',
      data_inicio: '2024-12-11T10:00:00.000Z',
      data_fim: '2024-12-11T15:00:00.000Z',
      id_bairro: 'BR001',
      id_territorialidade: 'TR002',
      id_logradouro: 'LG003',
      numero_logradouro: '123',
      id_unidade_organizacional: 'UO456',
      nome_unidade_organizacional: 'Central de Atendimento',
      id_unidade_organizacional_mae: 'UOM001',
      unidade_organizacional_ouvidoria: 'Ouvidoria Regional',
      categoria: 'Infraestrutura',
      id_tipo: 'TP789',
      tipo: 'Reparo',
      id_subtipo: 'ST012',
      subtipo: 'Vazamento',
      status: 'Em andamento',
      longitude: -43.2096,
      latitude: -22.9035,
      data_alvo_finalizacao: '2024-12-12T17:00:00.000Z',
      data_alvo_diagnostico: '2024-12-11T12:00:00.000Z',
      data_real_diagnostico: '2024-12-11T11:30:00.000Z',
      tempo_prazo: 5,
      prazo_unidade: 'Horas',
      prazo_tipo: 'Urgente',
      dentro_prazo: 'Sim',
      situacao: 'Aguardando peças',
      tipo_situacao: 'Operacional',
      justificativa_status: 'Peça sob encomenda',
      reclamacoes: 2,
      descricao: 'Relatado vazamento de água na rua principal',
      data_particao: '2024-12-11',
    },
    {
      id_chamado: 'CH654321',
      id_origem_ocorrencia: 'OC123456',
      data_inicio: '2024-12-10T08:30:00.000Z',
      data_fim: '2024-12-10T12:45:00.000Z',
      id_bairro: 'BR002',
      id_territorialidade: 'TR003',
      id_logradouro: 'LG004',
      numero_logradouro: '456',
      id_unidade_organizacional: 'UO789',
      nome_unidade_organizacional: 'Unidade Leste',
      id_unidade_organizacional_mae: 'UOM002',
      unidade_organizacional_ouvidoria: 'Ouvidoria Municipal',
      categoria: 'Saneamento',
      id_tipo: 'TP456',
      tipo: 'Manutenção',
      id_subtipo: 'ST789',
      subtipo: 'Desobstrução',
      status: 'Concluído',
      longitude: -46.6388,
      latitude: -23.5489,
      data_alvo_finalizacao: '2024-12-10T13:00:00.000Z',
      data_alvo_diagnostico: '2024-12-10T09:00:00.000Z',
      data_real_diagnostico: '2024-12-10T08:45:00.000Z',
      tempo_prazo: 4,
      prazo_unidade: 'Horas',
      prazo_tipo: 'Normal',
      dentro_prazo: 'Sim',
      situacao: 'Finalizado',
      tipo_situacao: 'Administrativo',
      justificativa_status: 'N/A',
      reclamacoes: 0,
      descricao: 'Obstrução em canal de esgoto relatada e resolvida',
      data_particao: '2024-12-10',
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <TypographyH3 className="mb-3">
        Interações com o Serviço 1746
      </TypographyH3>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <InteractionDashboard interactions={data} />
      </Suspense>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Histórico de Interações</CardTitle>
          <CardDescription>
            Lista detalhada de todas as interações com o serviço 1746
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading table...</div>}>
            <InteractionTable interactions={data} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
