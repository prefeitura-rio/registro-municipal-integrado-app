'use client'

import {
  AudioWaveform,
  Building2,
  Command,
  Database,
  Frame,
  Map,
  PieChart,
  Users2,
} from 'lucide-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

import { NavMain } from './components/nav-main'
import { NavProjects } from './components/nav-projects'
import { NavUser } from './components/nav-user'
import { TeamSwitcher } from './components/team-switcher'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Escritório de Dados',
      logo: Database,
      plan: 'Prefeitura do Rio',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Pessoas',
      url: '#',
      icon: Users2,
      items: [
        {
          title: 'Todas',
          url: '/objeto/pessoas',
        },
      ],
    },
    {
      title: 'Empresas',
      url: '#',
      icon: Building2,
      isActive: true,
      items: [
        {
          title: 'Todas',
          url: '/objeto/empresas',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
