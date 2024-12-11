import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Education() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Formal Education</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Bachelor's degree: Computer Science</p>
          <p>Master's degree: Artificial Intelligence</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Continuous Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Online courses completed: 15</p>
          <p>Professional certifications: 3</p>
          <p>Languages: English (native), Spanish (fluent)</p>
        </CardContent>
      </Card>
    </div>
  )
}
