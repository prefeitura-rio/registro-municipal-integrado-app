'use server'

import { api } from '@/lib/api'
import type { Interaction1746 } from '@/types/entities'

export async function get1746Reports(cpf: string) {
  const response = await api.get<Interaction1746[]>(
    `/person/${cpf}/1746/reports`,
  )
  return response.data
}
