"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function PreliminaryData() {
  return (
    <div className="form-section">
      <h3 className="section-title">Preliminary Data</h3>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="input-group">
              <Label htmlFor="projectImpact">Previous Project Impact</Label>
              <Textarea 
                id="projectImpact" 
                placeholder="Describe the impact of your previous projects"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="input-group">
              <Label htmlFor="metrics">Key Metrics</Label>
              <Textarea 
                id="metrics" 
                placeholder="Enter key performance metrics"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 