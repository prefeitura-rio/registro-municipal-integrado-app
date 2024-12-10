'use server'

import { api } from '@/lib/api'
import type { ClinicalEpisode } from '@/types/entities'

export async function getPersonClinicalHistory(cpf: string) {
  const response = await api.get<ClinicalEpisode[]>(
    `/person/${cpf}/health/encounters`,
  )
  return response.data
}
