import { redirect } from 'next/navigation'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { isAuthenticated } from '@/utils/auth'

import LogoutTimeOut from './components/logout-timeout'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isGranted = await isAuthenticated()
  if (!isGranted) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      <LogoutTimeOut />
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </div>
  )
}
