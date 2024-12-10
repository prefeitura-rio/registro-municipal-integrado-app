import { useQuery } from '@tanstack/react-query'

import { getPersonClinicalHistory } from '@/http/person/get-person-clinical-history'
import { isTooManyRequests } from '@/utils/error-handlers'

export function usePersonClinicalHistory(cpf: string) {
  return useQuery({
    queryKey: ['patient', 'encounters', cpf],
    queryFn: () => getPersonClinicalHistory(cpf),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (failureCount >= 2 || isTooManyRequests(error)) {
        return false
      }
      return true
    },
  })
}
