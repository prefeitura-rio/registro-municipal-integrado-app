'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Servico1746 } from './1746'
import { Education } from './education'
import { Health } from './health'
import { SocialAssistance } from './social-assistance'
import { Transportation } from './transport'

export function TabsCard({ cpf }: { cpf: string }) {
  const [activeTab, setActiveTab] = useState('transport')

  return (
    <div className="flex h-full min-h-[600px] grow flex-col lg:min-h-0 lg:w-2/3">
      <div className="flex h-0 flex-grow flex-col items-stretch">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex h-0 flex-grow flex-col"
        >
          <TabsList className="grid h-auto w-full flex-shrink-0 grid-cols-3 rounded-none xl:grid-cols-5 [&_*]:rounded-none">
            <TabsTrigger value="transport">Transporte</TabsTrigger>
            <TabsTrigger value="health">Saúde</TabsTrigger>
            <TabsTrigger value="social assistence">
              Assistência Social
            </TabsTrigger>
            <TabsTrigger value="1746">1746</TabsTrigger>
            <TabsTrigger value="education">Educação</TabsTrigger>
          </TabsList>
          <TabsContent value="transport" className="flex-grow overflow-auto">
            <Transportation cpf={cpf} />
          </TabsContent>
          <TabsContent value="health" className="flex-grow overflow-auto">
            <Health cpf={cpf} />
          </TabsContent>
          <TabsContent
            className="flex-grow overflow-auto"
            value="social assistence"
          >
            <SocialAssistance cpf={cpf} />
          </TabsContent>
          <TabsContent className="flex-grow overflow-auto" value="1746">
            <Servico1746 cpf={cpf} />
          </TabsContent>
          <TabsContent className="flex-grow overflow-auto" value="education">
            <Education />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
