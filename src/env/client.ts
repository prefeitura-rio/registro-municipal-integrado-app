import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
})
const _env = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
