import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold">
            Rate Limiting Dashboard
          </h1>
          <Button className="mt-4">
            Create API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
