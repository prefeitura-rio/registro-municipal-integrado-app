import { api } from '@/lib/api'
import type { Company } from '@/types/entities'

export async function getCompanyHistory(cnpj: string) {
  const response = await api.get<Company[]>(`/company/${cnpj}/history`)
  return response.data
}
