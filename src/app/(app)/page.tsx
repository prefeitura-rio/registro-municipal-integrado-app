import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Page() {
  return (
    <div>
      <header className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="h-6 w-[1px] bg-border" />
        <span>Início</span>
      </header>
    </div>
  )
}
