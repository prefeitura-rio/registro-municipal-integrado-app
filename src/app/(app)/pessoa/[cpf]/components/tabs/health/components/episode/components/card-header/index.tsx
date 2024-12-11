import type { ClinicalEpisode } from '@/types/entities'

import { HeaderInfo } from './components/header-info'

interface CardHeaderProps {
  item: ClinicalEpisode
}

export function CardHeader({ item }: CardHeaderProps) {
  const responsible = item.responsible
    ? `${item.responsible.name} - ${item.responsible.role}`
    : 'Não há informação'

  return (
    <div className="flex gap-3">
      <HeaderInfo title="Local" value={item.location} />
      <HeaderInfo title="Tipo" value={item.type} />
      <HeaderInfo title="Subtipo" value={item.subtype} />
      {item.exhibition_type !== 'clinical_exam' && (
        <HeaderInfo title="Responsável pelo atendimento" value={responsible} />
      )}
    </div>
  )
}
