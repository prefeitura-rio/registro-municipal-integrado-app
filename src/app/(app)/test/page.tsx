'use client'

import { useState } from 'react'

import { Markdown } from '@/components/markdon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const exampleQueries = [
  {
    text: 'Qual o subtipo de reclamação mais comum em Botafogo?',
    color: 'bg-blue-500',
  },
  {
    text: 'Qual o bairro que tem mais chamados de reparo de buraco?',
    color: 'bg-green-500',
  },
  {
    text: 'Qual o tipo de reclamação mais comum em Irajá?',
    color: 'bg-purple-500',
  },
]

const exampleResponse = `
*(Reasoning)* "O usuário quer saber qual o tipo de reclamação mais comum no bairro de Irajá. Para isso, preciso encontrar uma tabela que contenha informações sobre reclamações, incluindo o tipo de reclamação e o bairro onde ela ocorreu. Não sei quais tabelas estão disponíveis, então vou começar listando as tabelas para verificar qual tabela contém esses dados."

O usuário quer saber qual o tipo de reclamação mais comum em Irajá. Para responder a essa pergunta, preciso encontrar uma tabela que contenha informações sobre reclamações e bairros. A tabela \`rj-segovi.app_identidade_unica.1746_chamado_cpf\` parece relevante, pois contém informações sobre chamados do 1746. Vou verificar os metadados dessa tabela para entender melhor as colunas disponíveis e como posso relacionar as reclamações com o bairro de Irajá.

\`\`\`sql
O usuário perguntou qual o tipo de reclamação mais comum em Irajá. Para responder, utilizei a tabela \`rj-segovi.app_identidade_unica.1746_chamado_cpf\` que contém os chamados do 1746 e a tabela \`datario.dados_mestres.bairro\` para filtrar os chamados por bairro. Fiz um JOIN entre as duas tabelas usando o id do bairro e filtrei para o bairro de Irajá. Agrupei os resultados pelo tipo de chamado e ordenei pela quantidade de chamados de forma decrescente, pegando o primeiro resultado. O tipo de reclamação mais comum em Irajá é "Remoção Gratuita", com 48746 chamados.
\`\`\`
`

export default function QueryPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(exampleResponse)
    setQuery('')
  }

  const handleExampleClick = (example: string) => {
    setQuery(example)
    setResult(exampleResponse)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Como posso te ajudar?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite sua pergunta aqui..."
            className="w-full rounded-lg border-2 border-gray-300 p-4 text-lg transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <Button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-4 text-lg font-bold text-white transition duration-300 hover:bg-blue-700"
          >
            Enviar
          </Button>
        </form>

        <div className="space-y-4">
          <h3 className="text-center text-2xl font-semibold text-gray-700">
            Exemplos de perguntas:
          </h3>
          <div className="space-y-3">
            {exampleQueries.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto w-full whitespace-normal rounded-lg p-3 text-left ${example.color} border-none text-white transition duration-300 hover:opacity-90`}
                onClick={() => handleExampleClick(example.text)}
              >
                {example.text}
              </Button>
            ))}
          </div>
        </div>

        {result && (
          <div className="prose prose-sm w-full max-w-none rounded-lg border-2 border-gray-300 bg-white p-6 shadow-md">
            <Markdown content={result} />
          </div>
        )}
      </div>
    </div>
  )
}
