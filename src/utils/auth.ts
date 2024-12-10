import { cookies } from 'next/headers'

import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
} from '@/lib/api'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value
  const tokenExpirationDate = cookieStore.get(
    ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
  )?.value

  if (!token || !tokenExpirationDate) return false

  const timeRemaining = Date.parse(tokenExpirationDate) - Date.now()

  if (timeRemaining <= 0) return false

  return true
}
