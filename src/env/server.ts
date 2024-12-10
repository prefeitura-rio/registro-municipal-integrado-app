import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
})

export async function getEnv() {
  const _env = clientEnvSchema.safeParse(process.env)

  if (_env.success === false) {
    console.error('❌ Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables!')
  }

  return _env.data
}
