import { MessageSquare } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const otherFeatures = [
  {
    title: 'IA da Prefeitura',
    url: '/chat',
    icon: MessageSquare,
  },
]
export function OtherFeatures() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {otherFeatures.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
