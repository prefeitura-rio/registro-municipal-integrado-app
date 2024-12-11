import { Minus } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface InfoBoxProps {
  children?: ReactNode
  className?: string
}

export function InfoBox({ children, className }: InfoBoxProps) {
  return (
    <div
      className={cn(
        'leading-3.5 flex h-10 items-center justify-center rounded-lg border bg-card px-3 py-2 text-sm font-medium',
        className,
      )}
    >
      {children ?? <Minus className="size-3.5" />}
    </div>
  )
}
