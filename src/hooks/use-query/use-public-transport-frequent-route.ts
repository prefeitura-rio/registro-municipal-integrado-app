import { useQuery } from '@tanstack/react-query'

import { getPublicTransportFrequentRoutes } from '@/http/person/get-public-transport-frequent-routes'

export function usePublicTransportFrequentRoutes(cpf: string) {
  return useQuery({
    queryKey: ['person', cpf, 'public-transport', 'frequent-routes'],
    queryFn: () => getPublicTransportFrequentRoutes(cpf),
  })
}
