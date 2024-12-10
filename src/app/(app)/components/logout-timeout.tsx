'use client'

import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
} from '@/lib/api'
import { queryClient } from '@/lib/react-query'
import { logout } from '@/utils/logout'

export default function LogoutTimeOut() {
  const router = useRouter()

  useEffect(() => {
    async function setLogoutTimeout() {
      const token = await getCookie(ACCESS_TOKEN_COOKIE)
      const tokenExpiry = await getCookie(ACCESS_TOKEN_EXPIRATION_DATE_COOKIE)

      if (token && tokenExpiry) {
        const timeRemaining = Date.parse(tokenExpiry) - Date.now()
        if (timeRemaining > 0) {
          const timeout = setTimeout(() => {
            queryClient.clear()
            logout()
            clearTimeout(timeout)
          }, timeRemaining)

          return () => clearTimeout(timeout)
        } else {
          queryClient.clear()
          logout()
        }
      } else {
        queryClient.clear()
        logout()
        router.push('/auth/sign-in')
      }
    }

    setLogoutTimeout()
  }, [])

  return null
}
