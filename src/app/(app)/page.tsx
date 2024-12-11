'use client'

import { Building2, Users2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { TypographyH3 } from '@/components/typography/h3'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
  const router = useRouter()
  return (
    <div className="page">
      <BreadcrumbHeader items={[{ label: 'Início' }]} />
      <TypographyH3 className="mb-3">Módulos</TypographyH3>
      <div className="flex gap-4">
        <Card
          className="cursor-pointer hover:bg-accent"
          onClick={() => router.push('/pessoas')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users2 className="shrink-0" />
              Pessoas
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          className="cursor-pointer hover:bg-accent"
          onClick={() => router.push('/empresas')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building2 className="shrink-0" />
              Empresas
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
