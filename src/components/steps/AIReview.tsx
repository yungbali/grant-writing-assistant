"use client"
import { Card, CardContent } from "@/components/ui/card"
// Removed the import for Alert, AlertDescription, and AlertTitle due to the error
import { CheckCircle2 } from "lucide-react"

export function AIReview() {
  return (
    <div className="form-section">
      <h3 className="section-title">AI Review</h3>
      <div className="space-y-6">
        <div className="alert">
          <CheckCircle2 className="h-4 w-4" />
          <div className="alert-title">Review Complete</div>
          <div className="alert-description">
            AI has analyzed your grant application. Here are the key findings:
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h4 className="font-medium">Suggestions</h4>
              <ul className="list-disc pl-4 space-y-2">
                <li>Consider adding more quantitative metrics</li>
                <li>Strengthen the impact statement</li>
                <li>Add more details to the timeline</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 