'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useGrant } from "@/context/GrantContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  mission: z.string().min(50, "Mission statement must be at least 50 characters"),
});
export function OrganizationProfile() {
  const { grantData } = useGrant();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: grantData.organization.name,
      mission: grantData.organization.mission,
    },
  });
  const onSubmit = (data: any) => {
    grantData((prev: any) => ({
      ...prev,
      organization: data
    }));
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className="form-section">
      <h3 className="section-title">Organization Profile</h3>
      
      <div className="card-grid">
        <Card>
          <CardContent className="pt-6">
            <div className="input-group">
              <Label htmlFor="name">Organization Name</Label>
              <Input 
                id="name" 
                {...register("name")}
                placeholder="Enter organization name" 
              />
              {errors.name && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.name.message as React.ReactNode}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="input-group">
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea 
                id="mission"
                {...register("mission")}
                placeholder="Enter your organization's mission"
                className="min-h-[100px]"
              />
              {errors.mission && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.mission.message as React.ReactNode}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
} 