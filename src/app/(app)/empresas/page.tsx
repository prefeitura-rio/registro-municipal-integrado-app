import { BreadcrumbHeader } from '@/components/breadcrumb-header'

export default function Empresas() {
  return (
    <div className="page">
      <BreadcrumbHeader
        items={[{ label: 'Início', href: '/' }, { label: 'Empresas' }]}
      />
    </div>
  )
}
