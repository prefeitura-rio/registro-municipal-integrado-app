import { format } from 'date-fns'
import Image from 'next/image'

import ArrowDownRight from '@/assets/arrow-down-right.svg'

interface ExitDateProps {
  provider: string
  date: string | null
  deceased: boolean
}

export function ExitDate({ date, deceased, provider }: ExitDateProps) {
  if (provider === 'vitacare') return null

  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold leading-3">
        {date ? (deceased ? 'Óbito' : 'Saída') : ''}
      </span>
      {date ? (
        <div className="flex h-10 w-48 justify-between rounded-lg border bg-card px-2">
          <div className="flex items-center gap-1.5">
            <span className="leading-3.5 text-sm font-semibold">
              {format(date, 'dd.MM.y')}
            </span>
            <span className="leading-3.5 text-sm text-foreground/90">
              {format(date, 'HH:mm')}
            </span>
          </div>
          <div className="flex h-full items-center">
            <Image src={ArrowDownRight} className="size-4" alt="Entrada" />
          </div>
        </div>
      ) : (
        <div className="flex h-10 w-48 items-center justify-center rounded-lg border bg-accent">
          <span className="leading-3.5 text-sm font-medium">em andamento</span>
        </div>
      )}
    </div>
  )
}
