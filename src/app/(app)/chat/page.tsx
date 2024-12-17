'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { Spinner } from '@/components/ui/spinner'
import { getAIAnswer } from '@/http/ai/get-ai-answer'
import { cn } from '@/lib/utils'

import { ChatInput } from './components/chat-input'

export default function Page() {
  const [chatId] = useState(uuidv4())
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<
    { message: string; author: 'IA' | 'user' }[]
  >([])

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['ai', 'query'],
    mutationFn: getAIAnswer,
  })

  async function handleSendQuery(query: string) {
    setQuery('')
    setMessages((prev) => [...prev, { message: query, author: 'user' }])
    const response = await mutateAsync({ query, chatId })
    setMessages((prev) => [...prev, { message: response, author: 'IA' }])
  }

  return (
    <div className="page">
      <BreadcrumbHeader
        items={[{ label: 'Início', href: '/' }, { label: 'IA da Prefeitura' }]}
      />

      {/* New Chat */}
      {messages.length === 0 ? (
        <div className="flex flex-col p-4">
          <h1 className="mb-6 flex-shrink-0 text-center text-3xl font-bold">
            Como posso ajudar?
          </h1>
          <div className="flex justify-center">
            <div className="relative w-[80%]">
              <ChatInput
                query={query}
                handleSendQuery={handleSendQuery}
                setQuery={setQuery}
                disabled={isPending}
              />
            </div>
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
                <Spinner />{' '}
                <span className="text-sm text-muted-foreground">
                  IA da Prefeitura está digitando...
                </span>
              </div>
            )}
          </div>
          <ChatInput
            query={query}
            handleSendQuery={handleSendQuery}
            setQuery={setQuery}
            disabled={isPending}
          />
        </div>
      )}
    </div>
  )
}
