import { BasicInfo } from './components/basic-info'
import { Header } from './components/header'
import { TabsCard } from './components/tabs'

export default async function PersonDetails({
  params,
}: {
  params: Promise<{ cpf: string }>
}) {
  const cpf = (await params).cpf

  return (
    <div className="flex h-dvh flex-col overflow-hidden p-2">
      <Header cpf={cpf} />
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
    </div>
  )
}
