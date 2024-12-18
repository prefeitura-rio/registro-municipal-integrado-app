import { BreadcrumbHeader } from '@/components/breadcrumb-header'

import { Search } from './components/search'

export default function Empresas() {
  return (
    <div className="page">
      <BreadcrumbHeader
        items={[{ label: 'Início', href: '/' }, { label: 'Empresas' }]}
      />
      <Search />
    </div>
  )
}
