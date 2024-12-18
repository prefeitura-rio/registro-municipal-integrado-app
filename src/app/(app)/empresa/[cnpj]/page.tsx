'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { useProfile } from '@/hooks/use-query/use-profile'
import { cnpjRegex } from '@/utils/regex'
import { validateCNPJ } from '@/utils/validate-cnpj'

import { ResultAlert } from './components/alert'
import { BasicInfo } from './components/basic-info'

export default function PersonDetails() {
  const pathName = usePathname()
  const router = useRouter()
  const cnpj = pathName.split('/').pop()
  if (!cnpj) {
    router.back()
    return null
  }
  const { data: profile } = useProfile()

  if (!cnpjRegex.test(cnpj) || !validateCNPJ(cnpj)) {
    router.push('/')
  }

  const [openAlert, setOpenAlert] = useState(true)

  if (profile)
    return (
      <div className="page">
        <ResultAlert cnpj={cnpj} open={openAlert} setOpen={setOpenAlert} />
        {!openAlert && (
          <>
            <BreadcrumbHeader
              items={[
                { label: 'Início', href: '/' },
                { label: 'Pessoas', href: '/pessoas' },
                { label: cnpj },
              ]}
            />
            <div className="flex flex-grow flex-col overflow-auto">
              <div className="flex h-0 flex-grow flex-col items-stretch lg:flex-row">
                <BasicInfo cnpj={cnpj} />
              </div>
            </div>
          </>
        )}
      </div>
    )
}
