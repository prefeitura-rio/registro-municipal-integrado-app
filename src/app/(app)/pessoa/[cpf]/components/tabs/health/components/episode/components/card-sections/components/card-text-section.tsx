import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CardSectionProps {
  children: ReactNode
  title: string
  tooltip?: string
}

export function CardTextSection({
  children,
  title,
  tooltip,
}: CardSectionProps) {
  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-3.5 shrink-0 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent align="start">
              <span className="text-sm text-muted-foreground">
                {tooltip || 'Não há registro de informações'}
              </span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        {children || 'Não há registro de informações'}
      </span>
    </div>
  )
}
