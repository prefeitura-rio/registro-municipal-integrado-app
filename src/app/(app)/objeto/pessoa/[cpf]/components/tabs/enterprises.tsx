import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Enterprises() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Business Ownership</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tech startup: 30% ownership</p>
          <p>Local cafe: 50% ownership</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Stock portfolio value: $50,000</p>
          <p>Cryptocurrency holdings: $10,000</p>
        </CardContent>
      </Card>
    </div>
  )
}
