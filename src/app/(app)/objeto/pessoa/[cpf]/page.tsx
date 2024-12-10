import { TypographyH1 } from '@/components/typography/h1'

import { Header } from './components/header'

export default async function PersonDetails({
  params,
}: {
  params: Promise<{ cpf: string }>
}) {
  const cpf = (await params).cpf
  return (
    <div>
      <Header cpf={cpf} />
      <TypographyH1>{cpf}</TypographyH1>
    </div>
  )
}
