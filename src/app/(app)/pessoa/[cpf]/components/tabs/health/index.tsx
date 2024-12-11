import { CircleAlert } from 'lucide-react'
import { Fragment } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { usePersonClinicalHistory } from '@/hooks/use-query/use-person-clinical-history'

import { EpisodeCard } from './components/episode'

export function Health({ cpf }: { cpf: string }) {
  const {
    data: clinicalHistory,
    error,
    isPending,
  } = usePersonClinicalHistory(cpf)
  console.log({ error, isPending, clinicalHistory })
  return (
    <div className="w-96 overflow-hidden">
      <div className="my-[2.125rem] flex items-center justify-between gap-3 px-24">
        <div className="rounded-lg border bg-accent px-3 py-4">
          <h3 className="leading-3.5 text-typography-dark-blue text-sm font-medium">
            Histórico clínico
          </h3>
        </div>
        {/* <Filter
          setclinicalHistory={setclinicalHistory}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        /> */}
      </div>
      <div className="flex w-full flex-col gap-16 px-24 pt-10">
        {clinicalHistory ? (
          clinicalHistory.length > 0 ? (
            clinicalHistory.map((item, index) => (
              <Fragment key={index}>
                <EpisodeCard key={index} {...item} />
                {index < clinicalHistory.length - 1 &&
                  new Date(item.entry_datetime).getFullYear() >
                    new Date(
                      clinicalHistory[index + 1].entry_datetime,
                    ).getFullYear() && (
                    <div className="relative">
                      <div className="absolute -left-[70px] flex h-7 items-center justify-center rounded-lg border bg-card px-2.5">
                        <span className="text-typography-blue-gray-200 text-sm">
                          {new Date(
                            clinicalHistory[index + 1].entry_datetime,
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  )}
              </Fragment>
            ))
          ) : (
            <div className="flex justify-center">
              <Alert className="w-96">
                <CircleAlert className="h-4 w-4" />
                <AlertTitle>Nenhum resultado encontrado!</AlertTitle>
                <AlertDescription>
                  Esse paciente não possui histórico clínico nesse(s) tipo(s) de
                  unidade(s).
                </AlertDescription>
              </Alert>
            </div>
          )
        ) : (
          <div className="flex w-full items-center justify-center">
            <Spinner size="xl" className="text-typography-blue-gray-200" />
          </div>
        )}
      </div>
    </div>
  )
}
