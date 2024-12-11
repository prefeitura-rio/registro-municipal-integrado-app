import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme-provider'
import { ErrorToast } from '@/utils/error-toast'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Cad Único | Rio',
  description:
    'Plataforma de visualização de dados do Cadastro Único da Prefeitura do Rio de Janeiro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Toaster closeButton duration={15000} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ErrorToast />
        </ThemeProvider>
      </body>
    </html>
  )
}
