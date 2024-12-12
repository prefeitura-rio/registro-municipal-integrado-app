'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Servico1746 } from './1746'
import { Education } from './education'
import { Health } from './health'
import { SocialAssistance } from './social-assistance'
import { Transportation } from './transport'

export function TabsCard({ cpf }: { cpf: string }) {
  const [activeTab, setActiveTab] = useState('transport')

  return (
    <Card className="flex h-full min-h-[600px] grow flex-col lg:min-h-0 lg:w-2/3">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Dados do Cidadão</CardTitle>
        <CardDescription>
          Explore diferentes aspectos da vida do cidadão
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-0 flex-grow flex-col items-stretch">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex h-0 flex-grow flex-col"
        >
          <TabsList className="grid h-auto w-full flex-shrink-0 grid-cols-3 xl:grid-cols-5">
            <TabsTrigger value="transport">Transporte</TabsTrigger>
            <TabsTrigger value="health">Saúde</TabsTrigger>
            <TabsTrigger value="social assistence">
              Assistência Social
            </TabsTrigger>
            <TabsTrigger value="1746">1746</TabsTrigger>
            <TabsTrigger value="education">Educação</TabsTrigger>
          </TabsList>
          <TabsContent value="transport" className="flex-grow overflow-auto">
            <Transportation />
          </TabsContent>
          <TabsContent value="health" className="flex-grow overflow-auto">
            <Health cpf={cpf} />
          </TabsContent>
          <TabsContent
            className="flex-grow overflow-auto"
            value="social assistence"
          >
            <SocialAssistance />
          </TabsContent>
          <TabsContent className="flex-grow overflow-auto" value="1746">
            <Servico1746 cpf={cpf} />
          </TabsContent>
          <TabsContent className="flex-grow overflow-auto" value="education">
            <Education />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
