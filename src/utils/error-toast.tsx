'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

import { TOO_MANY_REQUESTS_ERROR_TOAST_LOCAL_STORAGE_KEY } from '@/lib/api'

export function ErrorToast() {
  useEffect(() => {
    const showToast = localStorage.getItem(
      TOO_MANY_REQUESTS_ERROR_TOAST_LOCAL_STORAGE_KEY,
    )
    if (showToast) {
      localStorage.removeItem(TOO_MANY_REQUESTS_ERROR_TOAST_LOCAL_STORAGE_KEY)
      toast.error(
        'Você atingiu o limite de consultas de CPF por minuto. Aguarde alguns segundos e tente novamente.',
      )
    }
  }, [])

  return null
}
