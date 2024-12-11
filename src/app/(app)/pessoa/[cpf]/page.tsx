'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { useProfile } from '@/hooks/use-query/use-profile'
import { cpfRegex } from '@/utils/regex'
import { validateCPF } from '@/utils/validate-cpf'

import { ResultAlert } from './components/alert'
import { BasicInfo } from './components/basic-info'
import { TabsCard } from './components/tabs'

export default function PersonDetails() {
  const pathName = usePathname()
  const router = useRouter()
  console.log(pathName)
  const cpf = pathName.split('/').pop()
  if (!cpf) {
    router.back()
    return null
  }
  const { data: profile } = useProfile()

  if (!cpfRegex.test(cpf) || !validateCPF(cpf)) {
    router.push('/')
  }

  const [openAlert, setOpenAlert] = useState(true)

  // useEffect(() => {
  //   if (profile && !profile.is_use_terms_accepted) {
  //     router.push('/')
  //   }
  // }, [profile, router])

  if (profile)
    return (
      <div className="flex h-dvh flex-col overflow-hidden p-2">
        <ResultAlert cpf={cpf} open={openAlert} setOpen={setOpenAlert} />
        {!openAlert && (
          <>
            <BreadcrumbHeader
              items={[
                { label: 'Início', href: '/' },
                { label: 'Pessoas', href: '/pessoas' },
                { label: cpf },
              ]}
            />
            <div className="flex flex-grow flex-col overflow-auto p-4">
              <h1 className="mb-6 flex-shrink-0 text-3xl font-bold">
                Perfil do Cidadão
              </h1>
              <div className="flex h-0 flex-grow flex-col items-stretch gap-6 lg:flex-row">
                {/* Basic Info Card */}
                <BasicInfo cpf={cpf} />

                {/* Tabs for different contexts */}
                <TabsCard cpf={cpf} />
              </div>
            </div>
          </>
        )}
      </div>
    )
}
