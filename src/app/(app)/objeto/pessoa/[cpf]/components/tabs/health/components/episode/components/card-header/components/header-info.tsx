interface HeaderInfoProps {
  title: string
  value: string | undefined | null
}
export function HeaderInfo({ title, value }: HeaderInfoProps) {
  if (!value) return null

  return (
    <div className="space-y-1">
      <span
        className="leading-3.5 text-typography-blue-gray-200 cursor-default text-xs font-semibold"
        onClick={(e) => e.stopPropagation()}
      >
        {title}
      </span>
      <div
        className="flex h-10 cursor-default items-center rounded-lg border bg-card px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="leading-3.5 text-typography-blue-gray-200 text-sm">
          {value}
        </span>
      </div>
    </div>
  )
}
