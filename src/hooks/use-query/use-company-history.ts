import { useQuery } from '@tanstack/react-query'

import { getCompanyHistory } from '@/http/companies/get-company-history'

export function useCompanyHistory(cnpj: string) {
  return useQuery({
    queryKey: ['company', cnpj],
    queryFn: () => getCompanyHistory(cnpj),
  })
}
