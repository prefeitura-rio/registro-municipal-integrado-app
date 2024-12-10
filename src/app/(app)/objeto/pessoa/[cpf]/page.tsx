import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Header } from './components/header'
import { TabsCard } from './components/tabs'

const citizen = {
  id: '12345',
  name: 'Jane Doe',
  age: 35,
  occupation: 'Software Engineer',
  address: '123 Smart Street, Intelligent City',
  socialScore: 85,
}

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
          <Card className="flex flex-col lg:w-1/3">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Informações Information</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="mb-4 flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${citizen.name}`}
                  />
                  <AvatarFallback>
                    {citizen.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{citizen.name}</h2>
                  <p className="text-gray-500">{citizen.occupation}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Age:</strong> {citizen.age}
                </p>
                <p>
                  <strong>Address:</strong> {citizen.address}
                </p>
                <p>
                  <strong>Social Score:</strong>{' '}
                  <Badge
                    className={
                      citizen.socialScore >= 80
                        ? 'bg-emerald-600'
                        : 'bg-amber-400'
                    }
                  >
                    {citizen.socialScore}
                  </Badge>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different contexts */}
          <TabsCard cpf={cpf} />
        </div>
      </div>
    </div>
  )
}
