'use server'

import { api } from '@/lib/api'
import type { Profile } from '@/types/entities'

export async function getUserProfile() {
  const response = await api.get<Profile>('/users/me')
  return response.data
}
