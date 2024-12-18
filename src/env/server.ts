'use server'

import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  MAPBOX_ACCESS_TOKEN: z.string(),
})

export async function getEnv() {
  const _env = clientEnvSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  })
  if (_env.success === false) {
    console.error('❌ Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables!')
  }

  return _env.data
}
