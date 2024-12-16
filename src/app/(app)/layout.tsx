import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AppSidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { COOKIES_PREFIX } from '@/lib/api'
import { isAuthenticated } from '@/utils/auth'

import LogoutTimeOut from '../../components/logout-timeout'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isGranted = await isAuthenticated()
  if (!isGranted) {
    redirect('/auth/sign-in')
  }
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get(`${COOKIES_PREFIX}sidebar:state`)?.value

  return (
    <CustomQueryClientProvider>
      <SidebarProvider defaultOpen={defaultOpen === 'true'}>
        <AppSidebar />
        <LogoutTimeOut />
        {children}
      </SidebarProvider>
    </CustomQueryClientProvider>
  )
}
