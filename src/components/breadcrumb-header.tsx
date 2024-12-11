import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { SidebarTrigger } from './ui/sidebar'

interface BreadcrumbHeaderProps {
  items: {
    label: string
    href?: string
  }[]
}

export function BreadcrumbHeader({ items }: BreadcrumbHeaderProps) {
  return (
    <header className="header">
      <SidebarTrigger />
      <div className="header-separator" />
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            if (item.href) {
              return (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )
            } else {
              return (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
