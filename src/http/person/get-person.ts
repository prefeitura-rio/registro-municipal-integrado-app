import { api } from '@/lib/api'
import type { Person } from '@/types/entities'

export async function getPerson(cpf: string) {
  const response = await api.get<Person>(`/person/${cpf}/basic-v2`)
  return response.data
}
