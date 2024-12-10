'use client'

import { AlertTriangle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useFormState } from '@/hooks/use-form-state'

import { signInAction } from './actions'

export default function SignInForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [response, handleSubmit, isPending] = useFormState(signInAction, () => {
    redirect('/')
  })

  useEffect(() => {
    if (response.success === false && 'errors' in response) {
      if (response.errors?.username) {
        usernameInputRef.current?.focus()
      } else if (response.errors?.password) {
        passwordInputRef.current?.focus()
      } else if (response.errors?.captchaToken) {
        //
      }
    }
  }, [response])

  return (
    <div>
      <form className="relative space-y-2" action={handleSubmit}>
        <Input
          ref={usernameInputRef}
          name="username"
          placeholder="123.456.789-00"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          ref={passwordInputRef}
          name="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" size="sm" className="w-full">
          {isPending ? <Spinner /> : 'Entrar'}
        </Button>

        <div className="relative">
          {response.success === false &&
            'message' in response &&
            response.message && (
              <Alert variant="destructive" className="absolute top-0 w-full">
                <AlertTriangle className="size-4 shrink-0" />
                <AlertTitle>{response.message.title}</AlertTitle>
                <AlertDescription>
                  {response.message.description}
                </AlertDescription>
              </Alert>
            )}
        </div>
      </form>
    </div>
  )
}
