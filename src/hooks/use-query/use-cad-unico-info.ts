import { useQuery } from '@tanstack/react-query'

import { getCadUnicoInfo } from '@/http/person/get-cad-unico-info'

export function useCadUnicoInfo(cpf: string) {
  return useQuery({
    queryKey: ['person', cpf, 'cadunico', 'info'],
    queryFn: () => getCadUnicoInfo(cpf),
  })
}
