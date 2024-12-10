import { useQuery } from '@tanstack/react-query'

import { getPeople } from '@/http/person/get-people'

export function usePeople() {
  return useQuery({
    queryKey: ['people'],
    queryFn: getPeople,
  })
}
