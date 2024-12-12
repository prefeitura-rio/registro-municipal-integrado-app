import { useQuery } from '@tanstack/react-query'

import { get1746Reports } from '@/http/person/get-1746-reports'

export function use1746Reports(cpf: string) {
  return useQuery({
    queryKey: ['person', cpf, '1746', 'reports'],
    queryFn: () => get1746Reports(cpf),
  })
}
