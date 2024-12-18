import { CNPJSearchForm } from './components/cnpj-search-form'

export function Search() {
  return (
    <div className="page items-center">
      <div className="max-w-[36.4375rem] translate-y-0">
        <div className="flex flex-col items-center gap-3 p-6">
          <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
            Buscar por CNPJ
          </h2>
          <span className="text-center text-typography-blue-gray-200">
            Insira um CNPJ para realizar a busca
          </span>
        </div>
        <CNPJSearchForm />
      </div>
    </div>
  )
}
