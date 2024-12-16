import { api } from '@/lib/api'
import type { PublicTransportFrequentRoute } from '@/types/entities'

export async function getPublicTransportFrequentRoutes(cpf: string) {
  const response = await api.get<PublicTransportFrequentRoute>(
    `/person/${cpf}/public-transport/frequent-routes`,
  )
  return response.data
}
