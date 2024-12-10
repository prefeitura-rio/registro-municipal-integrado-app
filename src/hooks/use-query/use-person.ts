import { useQuery } from '@tanstack/react-query'

import { getPerson } from '@/http/person/get-person'

export function usePerson(cpf: string) {
  return useQuery({
    queryKey: ['person'],
    queryFn: () => getPerson(cpf),
  })
}
