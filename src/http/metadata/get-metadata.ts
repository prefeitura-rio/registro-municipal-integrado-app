'use server'

import { api } from '@/lib/api'
import type { Metadata } from '@/types/entities'

export async function getMetadata() {
  const response = await api.get<Metadata>('frontend/metadata')
  return response.data
}
