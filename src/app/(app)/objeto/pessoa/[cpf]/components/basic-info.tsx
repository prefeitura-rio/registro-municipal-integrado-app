'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePerson } from '@/hooks/use-query/use-person'
import { calculateAge } from '@/utils/calculate-age'

export function BasicInfo({ cpf }: { cpf: string }) {
  const { data: person } = usePerson(cpf)
  const name = person?.social_name || person?.registration_name || 'N/A'

  return (
    <Card className="flex flex-col lg:w-1/3">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="mb-4 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
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
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">Engenheiro de Software</p>
          </div>
        </div>
        <div className="space-y-2">
          <p>
            <strong>CPF:</strong> {person?.cpf || 'N/A'}
          </p>
          <p>
            <strong>Idade:</strong>{' '}
            {person?.birth_date ? calculateAge(person?.birth_date) : 'N/A'}
          </p>
          <p>
            <strong>Bairro:</strong>
          </p>
          <p>
            <strong>Endereço:</strong>
          </p>
          <p>
            <strong>Telefone:</strong> {person?.phone || 'N/A'}
          </p>
          <p>
            <strong>Raça:</strong> {person?.race || 'N/A'}
          </p>
          <p>
            <strong>Unidade de saúde de referência:</strong>{' '}
            {person?.family_clinic.name || 'N/A'}
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
        </div>
      </CardContent>
    </Card>
  )
}
