'use client'

import { useQuery } from '@tanstack/react-query'

import { getUserProfile } from '@/http/users/get-user-profile'

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfile(),
  })
}
