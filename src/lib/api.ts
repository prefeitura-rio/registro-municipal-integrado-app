import axios from 'axios'
import { type CookiesFn, deleteCookie, getCookie } from 'cookies-next'

import { env } from '@/env/client'
import { isGrantError, isTooManyRequests } from '@/utils/error-handlers'

export const isApiError = axios.isAxiosError

const COOKIES_PREFIX = '@ed-rio:cad-unico:'
export const ACCESS_TOKEN_COOKIE = `${COOKIES_PREFIX}access_token`
export const ACCESS_TOKEN_EXPIRATION_DATE_COOKIE = `${COOKIES_PREFIX}access_token_expiration_date`
export const TOO_MANY_REQUESTS_ERROR_TOAST_LOCAL_STORAGE_KEY = `${COOKIES_PREFIX}too_many_requests_error_toast`
export const GRANT_ERROR_TOAST_LOCAL_STORAGE_KEY = `${COOKIES_PREFIX}grant_error`

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  // Try to get token from cookies
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }
  const token = await getCookie(ACCESS_TOKEN_COOKIE, { cookies: cookieStore })

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isGrantError(error)) {
      deleteCookie('token')
      if (typeof window !== 'undefined' && window.location) {
        const currentPath = window.location.pathname
        if (currentPath !== '/auth/sign-in') {
          localStorage.setItem(
            GRANT_ERROR_TOAST_LOCAL_STORAGE_KEY,
            'Sua sessão expirou. Por favor, faça login novamente.',
          )
          window.location.href = '/auth/sign-in'
        }
      }
    }
    if (isTooManyRequests(error)) {
      localStorage.setItem(
        TOO_MANY_REQUESTS_ERROR_TOAST_LOCAL_STORAGE_KEY,
        'Você realizou muitas requisições em um curto espaço de tempo. Aguarde alguns segundos e tente novamente.',
      )
      const currentPath = window.location.pathname
      if (currentPath !== '/') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  },
)
