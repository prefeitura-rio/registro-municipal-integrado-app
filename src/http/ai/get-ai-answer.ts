import { api } from '@/lib/api'

interface GetAIAnswerProps {
  query: string
  chatId: string
}
export async function getAIAnswer({ query, chatId }: GetAIAnswerProps) {
  const response = await api.post<{ response: string }>(
    `/ai/query?chat_id=${chatId}`,
    {
      query,
    },
  )
  return response.data.response
}
