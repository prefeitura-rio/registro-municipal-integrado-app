import { api } from '@/lib/api'
import type { PublicTransportEvent } from '@/types/entities'

export async function getPublicTransportHistory(cpf: string) {
  const response = await api.get<PublicTransportEvent[]>(
    `/person/${cpf}/public-transport/history`,
  )
  return response.data.sort(
    (a, b) =>
      new Date(b.datetime_transacao).getTime() -
      new Date(a.datetime_transacao).getTime(),
  )
}
