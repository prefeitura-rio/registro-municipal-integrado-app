'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { cnpjRegex } from '@/utils/regex'
import { formatCNPJ } from '@/utils/string-formatters'
import { validateCNPJ } from '@/utils/validate-cnpj'

const formSchema = z.object({
  cnpj: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => cnpjRegex.test(value), {
      message: 'CNPJ Inválido',
    })
    .superRefine((arg, ctx) => {
      const isFormatCorrect = cnpjRegex.test(arg)

      if (!isFormatCorrect || !validateCNPJ(arg)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CNPJ Inválido',
        })
      }
    }),
})

type FormType = z.infer<typeof formSchema>

export function CNPJSearchForm() {
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
    const cnpj = props.cnpj.replaceAll(/[.\D]/g, '')
    console.log({ cnpj })
    router.push(`/empresa/${cnpj}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-full space-y-2', errors?.cnpj ? '' : 'pb-12')}
    >
      <Input
        {...register('cnpj')}
        placeholder="12.345.678/0001-23"
        onChange={(e) => {
          const formattedCNPJ = formatCNPJ(e.target.value)
          setValue('cnpj', formattedCNPJ)
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

      {errors?.cnpj && (
        <div className="w-full rounded-md bg-destructive px-4 py-2 text-center">
          <span className="text-white">CNPJ inválido</span>
        </div>
      )}
    </form>
  )
}
