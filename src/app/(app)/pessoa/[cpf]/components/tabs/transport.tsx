import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Transportation() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Public Transport Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Monthly bus rides: 45</p>
          <p>Monthly subway rides: 30</p>
          <p>Bike-sharing usage: 15 hours</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Private Vehicle</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Electric car: Tesla Model 3</p>
          <p>Average daily mileage: 20 miles</p>
          <p>Charging station visits per week: 2</p>
        </CardContent>
      </Card>
    </div>
  )
}
