import { api } from '@/lib/api'
import type { CadUnicoInfo } from '@/types/entities'

export async function getCadUnicoInfo(cpf: string) {
  const response = await api.get<CadUnicoInfo>(`/person/${cpf}/cadunico/info`)
  return response.data
}
