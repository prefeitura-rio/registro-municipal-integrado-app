'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCadUnicoInfo } from '@/hooks/use-query/use-cad-unico-info'
import { usePerson } from '@/hooks/use-query/use-person'
import { calculateAge } from '@/utils/calculate-age'

export function BasicInfo({ cpf }: { cpf: string }) {
  const { data: health } = usePerson(cpf)
  const { data: cadUnico } = useCadUnicoInfo(cpf)
  const citizen = {
    ...cadUnico,
    ...health,
    name: health?.social_name || health?.registration_name || 'N/A',
    age: health?.birth_date ? calculateAge(health?.birth_date) : 'N/A',
  }

  return (
    <Card className="flex flex-col lg:w-1/3">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="mb-4 flex items-center space-x-4">
          {/* <Avatar className="h-20 w-20">
            <AvatarImage
              color="green"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}&backgroundColor=43a047`}
            />
            <AvatarFallback className="text-5xl">
              {name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar> */}
          <div>
            <h2 className="text-2xl font-bold">{citizen.name}</h2>
            <p className="text-gray-500">Engenheiro de Software</p>
          </div>
        </div>
        {/* <div className="space-y-2">
          <p>
            <strong>CPF:</strong> {health?.cpf || 'N/A'}
          </p>
          <p>
            <strong>Idade:</strong>{' '}
            {health?.birth_date ? calculateAge(health?.birth_date) : 'N/A'}
          </p>
          <p>
            <strong>Bairro:</strong>
          </p>
          <p>
            <strong>Endereço:</strong>
          </p>
          <p>
            <strong>Telefone:</strong> {health?.phone || 'N/A'}
          </p>
          <p>
            <strong>Raça:</strong> {health?.race || 'N/A'}
          </p>
          <p>
            <strong>Unidade de saúde de referência:</strong>{' '}
            {health?.family_clinic.name || 'N/A'}
          </p>
          <p>
            <strong>Ônibus que mais utiliza:</strong>
          </p>
          <p>
            <strong>Benefícios CadÚnico:</strong>
          </p>
          <p>
            <strong>Estimativa de Renda:</strong>
          </p>
        </div> */}
        {health && cadUnico && citizen && (
          // <Accordion
          //   type="multiple"
          //   // collapsible
          //   defaultValue={[
          //     'personal',
          //     'health',
          //     'transport',
          //     'socioeconomic',
          //     'housing',
          //     'registration',
          //   ]}
          //   className="w-full"
          // >
          //   <AccordionItem value="personal">
          //     <AccordionTrigger className="pr">Dados Pessoais</AccordionTrigger>
          //     <AccordionContent>
          //       <div className="space-y-2">
          //         <p>
          //           <strong>CPF:</strong> {citizen.cpf}
          //         </p>
          //         <p>
          //           <strong>Idade:</strong> {citizen.age}
          //         </p>
          //         <p>
          //           <strong>Telefone:</strong> {citizen.phone}
          //         </p>
          //         <p>
          //           <strong>Endereço:</strong> {''}
          //         </p>
          //         <p>
          //           <strong>Bairro:</strong> {''}
          //         </p>
          //       </div>
          //     </AccordionContent>
          //   </AccordionItem>
          //   <AccordionItem value="health">
          //     <AccordionTrigger>Saúde</AccordionTrigger>
          //     <AccordionContent>
          //       <p>
          //         <strong>Unidade de Saúde:</strong>{' '}
          //         {citizen.family_clinic?.name || 'N/A'}
          //       </p>
          //     </AccordionContent>
          //   </AccordionItem>
          //   <AccordionItem value="transport">
          //     <AccordionTrigger>Transporte</AccordionTrigger>
          //     <AccordionContent>
          //       <p>
          //         <strong>Ônibus mais utilizado:</strong> {''}
          //       </p>
          //     </AccordionContent>
          //   </AccordionItem>
          //   <AccordionItem value="socioeconomic">
          //     <AccordionTrigger>Dados Socioeconômicos</AccordionTrigger>
          //     <AccordionContent>
          //       <div className="space-y-2">
          //         <p>
          //           <strong>Benefício CadÚnico:</strong> {''}
          //         </p>
          //         <p>
          //           <strong>Renda Média Familiar:</strong>{' '}
          //           {citizen.renda?.renda_media_familia}
          //         </p>
          //         <p>
          //           <strong>Renda do Emprego:</strong>{' '}
          //           {citizen.renda?.renda_emprego_ultimo_mes}
          //         </p>
          //         <p>
          //           <strong>Outras Rendas:</strong>{' '}
          //           {citizen.renda?.renda_outras_rendas}
          //         </p>
          //       </div>
          //     </AccordionContent>
          //   </AccordionItem>
          //   <AccordionItem value="housing">
          //     <AccordionTrigger>Moradia</AccordionTrigger>
          //     <AccordionContent>
          //       <div className="space-y-2">
          //         <p>
          //           <strong>Tipo de Domicílio:</strong>{' '}
          //           {citizen.domicilio?.especie_domicilio}
          //         </p>
          //         <p>
          //           <strong>Localização:</strong>{' '}
          //           {citizen.domicilio?.iluminacao}
          //         </p>
          //         <p>
          //           <strong>Despesa Alimentação:</strong>{' '}
          //           {citizen.domicilio?.despesa_alimentacao}
          //         </p>
          //         <p>
          //           <strong>Despesa Aluguel:</strong>{' '}
          //           {citizen.domicilio?.despesa_aluguel}
          //         </p>
          //         <p>
          //           <strong>Despesa Gás:</strong>{' '}
          //           {citizen.domicilio?.despesa_gas}
          //         </p>
          //       </div>
          //     </AccordionContent>
          //   </AccordionItem>
          //   <AccordionItem value="registration">
          //     <AccordionTrigger>Dados Cadastrais</AccordionTrigger>
          //     <AccordionContent>
          //       <div className="space-y-2">
          //         <div className="flex gap-2">
          //           <p>
          //             <strong>CPF Válido:</strong>{' '}
          //           </p>
          //           {citizen.dados?.cpf_valido_indicador ? (
          //             <Badge className="bg-emerald-600">Sim</Badge>
          //           ) : (
          //             <Badge className="bg-rose-800">Não</Badge>
          //           )}
          //         </div>
          //         <p>
          //           <strong>Data de Cadastro:</strong>{' '}
          //           {citizen.dados?.data_cadastro}
          //         </p>
          //         <p>
          //           <strong>Última Atualização:</strong>{' '}
          //           {citizen.dados?.data_ultima_atualizacao}
          //         </p>
          //       </div>
          //     </AccordionContent>
          //   </AccordionItem>
          // </Accordion>
          <div className="space-y-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  <strong>CPF:</strong> {citizen.cpf}
                </p>
                <p>
                  <strong>Idade:</strong> {citizen.age}
                </p>
                <p>
                  <strong>Telefone:</strong> {citizen.phone}
                </p>
                <p>
                  <strong>Endereço:</strong> {''}
                </p>
                <p>
                  <strong>Bairro:</strong> {''}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Unidade de Saúde:</strong>{' '}
                  {citizen.family_clinic?.name || 'N/A'}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Ônibus mais utilizado:</strong> {''}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Dados Socioeconômicos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Benefício CadÚnico:</strong> {''}
                </p>
                <p>
                  <strong>Renda Média Familiar:</strong>{' '}
                  {citizen.renda?.renda_media_familia}
                </p>
                <p>
                  <strong>Renda do Emprego:</strong>{' '}
                  {citizen.renda?.renda_emprego_ultimo_mes}
                </p>
                <p>
                  <strong>Outras Rendas:</strong>{' '}
                  {citizen.renda?.renda_outras_rendas}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Moradia</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Tipo de Domicílio:</strong>{' '}
                  {citizen.domicilio?.especie_domicilio}
                </p>
                <p>
                  <strong>Localização:</strong> {citizen.domicilio?.iluminacao}
                </p>
                <p>
                  <strong>Despesa Alimentação:</strong>{' '}
                  {citizen.domicilio?.despesa_alimentacao}
                </p>
                <p>
                  <strong>Despesa Aluguel:</strong>{' '}
                  {citizen.domicilio?.despesa_aluguel}
                </p>
                <p>
                  <strong>Despesa Gás:</strong> {citizen.domicilio?.despesa_gas}
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-sm">Dados Cadastrais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <p>
                    <strong>CPF Válido:</strong>{' '}
                  </p>
                  {citizen.dados?.cpf_valido_indicador ? (
                    <Badge className="bg-emerald-600">Sim</Badge>
                  ) : (
                    <Badge className="bg-destructive">Não</Badge>
                  )}
                </div>
                <p>
                  <strong>Data de Cadastro:</strong>{' '}
                  {citizen.dados?.data_cadastro}
                </p>
                <p>
                  <strong>Última Atualização:</strong>{' '}
                  {citizen.dados?.data_ultima_atualizacao}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
