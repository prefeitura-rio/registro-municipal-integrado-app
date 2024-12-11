import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Revenue() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Annual salary: $120,000</p>
          <p>Other income: $5,000</p>
          <p>Total taxable income: $125,000</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Taxes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Federal tax paid: $22,500</p>
          <p>State tax paid: $6,250</p>
          <p>Total tax rate: 23%</p>
        </CardContent>
      </Card>
    </div>
  )
}
