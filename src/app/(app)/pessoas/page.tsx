import { BreadcrumbHeader } from '@/components/breadcrumb-header'

import { Search } from './components/search'

export default function Pessoas() {
  return (
    <div className="page">
      <BreadcrumbHeader
        items={[{ label: 'Início', href: '/' }, { label: 'Pessoas' }]}
      />
      <Search />
    </div>
  )
}
