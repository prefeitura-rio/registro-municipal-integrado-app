import { CPFSearchForm } from './components/cpf-search-form'

export function Search() {
  return (
    <div className="page items-center">
      <div className="max-w-[36.4375rem] translate-y-0">
        <div className="flex flex-col items-center gap-3 p-6">
          <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
            Buscar por CPF
          </h2>
          <span className="text-center text-typography-blue-gray-200">
            Insira um CPF para realizar a busca
          </span>
        </div>
        <CPFSearchForm />
      </div>
    </div>
  )
}
;<main className="mx-auto flex w-full max-w-[36.4375rem] translate-y-10 flex-col items-center justify-center p-4">
  <div className="flex flex-col items-center gap-3 p-6">
    <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
      Buscar por CPF
    </h2>
    <span className="text-center text-typography-blue-gray-200">
      Insira um CPF para realizar a busca
    </span>
  </div>
  <CPFSearchForm />
</main>
