"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function TeamComposition() {
  return (
    <div className="form-section">
      <h3 className="section-title">Team Composition</h3>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="input-group">
              <Label htmlFor="teamMember">Team Member</Label>
              <div className="flex gap-2">
                <Input id="teamMember" placeholder="Enter team member name" />
                <Input placeholder="Role" />
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 