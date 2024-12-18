'use client'

import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useCompanyHistory } from '@/hooks/use-query/use-company-history'
import { useProfile } from '@/hooks/use-query/use-profile'

import { PatientAlert } from './components/patient-alert'

interface ResultAlertProps {
  cnpj: string
  open: boolean
  setOpen: (open: boolean) => void
}

export function ResultAlert({ cnpj, open, setOpen }: ResultAlertProps) {
  const router = useRouter()
  const { data: profile } = useProfile()
  const {
    data: companyHistory,
    error: companyHistoryError,
    isLoading: isCompanyHistoryPending,
  } = useCompanyHistory(cnpj)

  return (
    <AlertDialog open={open}>
      {!companyHistoryError &&
      (!companyHistory || companyHistory.length > 0) ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            {profile && companyHistory ? (
              <>
                <AlertDialogTitle>Dados sigilosos!</AlertDialogTitle>
                <AlertDialogDescription className="text-justify">
                  Prezado(a) Sr.(a){' '}
                  <span className="font-bold">{profile.full_name}</span>, os
                  dados a seguir são sensíveis. É de sua responsabilidade
                  garantir o sigilo sobre essas informações. Este ambiente é{' '}
                  <span className="font-bold">MONITORADO</span>, e o uso
                  indevido ou compartilhamento não autorizado poderá resultar em
                  sanções legais.
                </AlertDialogDescription>
              </>
            ) : (
              <>
                <AlertDialogTitle className="sr-only">
                  Dados sigilosos!
                </AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  Carregando...
                </AlertDialogDescription>
                <Skeleton className="h-7 w-36" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[80%]" />
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => router.push('/pessoas')}
              disabled={!companyHistory || !profile}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setOpen(false)}
              disabled={!companyHistory || !profile}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <PatientAlert
          encounters={companyHistory}
          headerError={companyHistoryError}
          isHeaderLoading={isCompanyHistoryPending}
        />
      )}
    </AlertDialog>
  )
}
