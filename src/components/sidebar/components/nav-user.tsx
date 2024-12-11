'use client'

import {
  ChevronsUpDown,
  LogOut,
  MonitorCog,
  Moon,
  Sun,
  SunMoon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useProfile } from '@/hooks/use-query/use-profile'
import { logout } from '@/utils/logout'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data: profile } = useProfile()
  const { setTheme, theme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={profile?.full_name} /> */}
                <AvatarFallback className="rounded-lg">
                  {profile?.full_name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {profile?.full_name}
                </span>
                <span className="truncate text-xs">{profile?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={profile.avatar} alt={profile?.full_name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {profile?.full_name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {profile?.full_name}
                  </span>
                  <span className="truncate text-xs">{profile?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon />
                  Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent collisionPadding={8} sideOffset={8}>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      setTheme('light')
                    }}
                    className={theme === 'light' ? 'bg-accent' : ''}
                  >
                    <Sun />
                    Claro
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      setTheme('dark')
                    }}
                    className={theme === 'dark' ? 'bg-accent' : ''}
                  >
                    <Moon />
                    Escuro
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      setTheme('system')
                    }}
                    className={theme === 'system' ? 'bg-accent' : ''}
                  >
                    <MonitorCog />
                    Sistema
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
