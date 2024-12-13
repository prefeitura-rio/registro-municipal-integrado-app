import { useQuery } from '@tanstack/react-query'

import { getPublicTransportHistory } from '@/http/person/get-public-transport-history'

export function usePublicTransportHistory(cpf: string) {
  return useQuery({
    queryKey: ['person', cpf, 'public-transport', 'history'],
    queryFn: () => getPublicTransportHistory(cpf),
  })
}
