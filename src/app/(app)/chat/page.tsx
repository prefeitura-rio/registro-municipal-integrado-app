'use client'

import { useMutation } from '@tanstack/react-query'
import { useCookies } from 'next-client-cookies'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { env } from '@/env/client'
import { getAIAnswer } from '@/http/ai/get-ai-answer'
import { ACCESS_TOKEN_COOKIE } from '@/lib/api'
import { cn } from '@/lib/utils'

import { ChatInput } from './components/chat-input'

export default function Page() {
  const cookies = useCookies()
  const [chatId] = useState(uuidv4())
  const [isPending, setIsPending] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<
    { message: string; author: 'IA' | 'user' }[]
  >([])

  const { mutateAsync } = useMutation({
    mutationKey: ['ai', 'query'],
    mutationFn: getAIAnswer,
  })

  function handleSendQuery(newMessage: string) {
    setIsPending(true)
    setQuery('')
    setMessages((prev) => [...prev, { message: newMessage, author: 'user' }])
    mutateAsync({ chatId, query: newMessage })
  }

  useEffect(() => {
    async function initWS() {
      const httpBaseUrl = env.NEXT_PUBLIC_API_URL.endsWith('/')
        ? env.NEXT_PUBLIC_API_URL.slice(0, -1)
        : env.NEXT_PUBLIC_API_URL
      const wsBaseUrl = httpBaseUrl.replace('https', 'wss')
      console.log(`${wsBaseUrl}/ai/ws/${chatId}`)
      const ws = new WebSocket(`${wsBaseUrl}/ai/ws/${chatId}`)

      ws.onopen = () => {
        console.log('Connected to WebSocket server!')

        const token = cookies.get(ACCESS_TOKEN_COOKIE)
        ws.send(JSON.stringify({ Authorization: `Bearer ${token}` }))
      }

      ws.onmessage = (event) => {
        // const data = JSON.parse(event.data)
        if (event.data instanceof Blob) {
          console.log('Received Blob:')

          const reader = new FileReader()

          reader.onloadend = () => {
            try {
              const jsonString = reader.result as string
              const data = JSON.parse(jsonString)
              console.log({ data })

              if (data.status === 'failure') {
                console.error('Error from AI:', data.error_message)
                setMessages((prev) => [
                  ...prev,
                  {
                    message: `Erro ao processar a requisição. Tente novamente. Erro: ${data.error_message}`,
                    author: 'IA',
                  },
                ])
                return
              }

              if (data.status === 'success') {
                console.log('Success from AI:', data.response)
                const newMessage = data.response

                setMessages((prev) => [
                  ...prev,
                  { message: newMessage, author: 'IA' },
                ])
              }
            } catch (error) {
              console.error('Error parsing Blob data:', error)
            }
          }

          reader.readAsText(event.data)
        }

        setIsPending(false)
      }

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server!')
        if (isPending) {
          setMessages((prev) => [
            ...prev,
            {
              message: 'Erro ao processar a requisição. Tente novamente.',
              author: 'IA',
            },
          ])
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        ws.close()
      }

      // Salva a instância do WebSocket no estado
      setSocket(ws)

      // Cleanup ao desmontar o componente
      return () => {
        console.log('Cleaning up WebSocket connection...')
        ws.close()
      }
    }

    if (messages.length > 0 && !socket) {
      initWS()
    }
  }, [messages])

  return (
    <div className="page">
      <BreadcrumbHeader
        items={[{ label: 'Início', href: '/' }, { label: 'IA da Prefeitura' }]}
      />

      {/* New Chat */}
      {messages.length === 0 ? (
        <div className="flex flex-grow flex-col items-center justify-center gap-2 p-4">
          <h1 className="mb-6 flex-shrink-0 text-center text-3xl font-bold">
            Como posso ajudar?
          </h1>
          <div className="w-full">
            <ChatInput
              query={query}
              handleSendQuery={() => handleSendQuery(query)}
              setQuery={setQuery}
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col gap-2 text-sm text-secondary-foreground">
            <Button
              className=""
              variant="outline"
              onClick={() =>
                handleSendQuery(
                  'Qual o tipo de reclamação mais comum em Irajá?',
                )
              }
            >
              Qual o tipo de reclamação mais comum em Irajá?
            </Button>
            <Button
              className=""
              variant="outline"
              onClick={() =>
                handleSendQuery(
                  'Qual é o medicamento de uso contínuo mais comum?',
                )
              }
            >
              Qual é o medicamento de uso contínuo mais comum?
            </Button>
            <Button
              className=""
              variant="outline"
              onClick={() =>
                handleSendQuery(
                  'Qual é a alergia mais comum na Zona Norte da cidade?',
                )
              }
            >
              Qual é a alergia mais comum na Zona Norte da cidade?
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-between overflow-y-auto">
          <div className="-mr-4 flex max-w-screen-lg flex-grow flex-col gap-3 overflow-y-auto pb-6 pr-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  item.author === 'IA' ? 'justify-start' : 'justify-end',
                )}
              >
                <p
                  className={cn(
                    'max-w-[80%] rounded-lg border-border bg-card px-6 py-4',
                    item.author === 'IA' ? 'bg-primary/20' : 'bg-primary/10',
                  )}
                >
                  {item.message}
                </p>
              </div>
            ))}
            {isPending && (
              <div className="mb-3 flex items-center gap-2">
                <Spinner />
                <span className="block text-sm text-muted-foreground">
                  IA da Prefeitura está pensando...
                </span>
              </div>
            )}
          </div>
          <ChatInput
            query={query}
            handleSendQuery={() => handleSendQuery(query)}
            setQuery={setQuery}
            disabled={isPending}
          />
        </div>
      )}
    </div>
  )
}
