import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  query: string
  setQuery: (value: string) => void
  handleSendQuery: (query: string) => void
  disabled?: boolean
}
export function ChatInput({
  query,
  setQuery,
  handleSendQuery,
  disabled = false,
}: ChatInputProps) {
  return (
    <div className="relative z-10 -mt-2 w-full max-w-screen-lg rounded-lg">
      <Textarea
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        className="w-full resize-none bg-background"
        rows={3}
      />
      <Button
        size="icon"
        className="absolute bottom-2 right-2"
        onClick={() => handleSendQuery(query)}
        disabled={disabled}
      >
        <ArrowUp className="size-4 shrink-0" />
      </Button>
    </div>
  )
}
