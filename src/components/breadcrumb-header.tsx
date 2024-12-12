import { Fragment } from 'react'

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
          {items.map((item, index) => (
            <Fragment key={index}>
              {item.href ? (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
