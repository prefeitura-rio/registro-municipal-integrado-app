import { cn } from '@/lib/utils'

export function TypographyH6({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        className,
        'scroll-m-20 text-base font-semibold tracking-tight',
      )}
    >
      {children}
    </p>
  )
}
