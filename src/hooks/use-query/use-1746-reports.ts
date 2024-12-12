import { useQuery } from '@tanstack/react-query'

import { get1746Reports } from '@/http/1746/get-1746-reports'

export function use1746Reports(cpf: string) {
  return useQuery({
    queryKey: ['1746', cpf],
    queryFn: () => get1746Reports(cpf),
  })
}
