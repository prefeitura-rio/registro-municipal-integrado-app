'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { cpfRegex } from '@/utils/regex'
import { formatCPF } from '@/utils/string-formatters'
import { validateCPF } from '@/utils/validate-cpf'

const formSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => cpfRegex.test(value), {
      message: 'CPF Inválido',
    })
    .superRefine((arg, ctx) => {
      const isFormatCorrect = cpfRegex.test(arg)

      if (!isFormatCorrect || !validateCPF(arg)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CPF Inválido',
        })
      }
    }),
})

type FormType = z.infer<typeof formSchema>

export function CPFSearchForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(props: FormType) {
    const cpf = props.cpf.replaceAll(/[.-]/g, '')
    router.push(`/pessoa/${cpf}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-full space-y-2', errors?.cpf ? '' : 'pb-12')}
    >
      <Input
        {...register('cpf')}
        placeholder="123.456.789-00"
        onChange={(e) => {
          const formattedCPF = formatCPF(e.target.value)
          setValue('cpf', formattedCPF)
        }}
      />

      <Button
        type="submit"
        size="sm"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Pesquisar'}
      </Button>

      {errors?.cpf && (
        <div className="w-full rounded-md bg-destructive px-4 py-2 text-center">
          <span className="text-white">CPF inválido</span>
        </div>
      )}
    </form>
  )
}
