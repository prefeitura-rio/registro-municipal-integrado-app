import { CircleAlert } from 'lucide-react'
import { Fragment } from 'react'

import { TypographyH3 } from '@/components/typography/h3'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { usePersonClinicalHistory } from '@/hooks/use-query/use-person-clinical-history'

import { EpisodeCard } from './components/episode'

export function Health({ cpf }: { cpf: string }) {
  const { data: clinicalHistory } = usePersonClinicalHistory(cpf)
  return (
    <div className="container mx-auto p-4">
      {/* <div className="my-[2.125rem] flex items-center justify-between gap-3 px-24">
        <div className="rounded-lg border bg-accent px-3 py-4">
          <h3 className="leading-3.5 text-typography-dark-blue text-sm font-medium">
            Histórico clínico
          </h3>
        </div>
        <Filter
          setclinicalHistory={setclinicalHistory}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
      </div> */}
      <TypographyH3 className="mb-3">Histórico Clínico</TypographyH3>
      <div className="flex w-full flex-col gap-16 pl-14 pr-0">
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
                        <span className="text-sm text-typography-blue-gray-200">
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
