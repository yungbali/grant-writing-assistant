import React, { useState } from 'react'
import { OrganizationProfile } from './steps/OrganizationProfile'

export function GrantWritingAssistant() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const steps = [
    { title: "Organization Profile", component: OrganizationProfile },
    // ... other steps ...
  ]

  const CurrentStepComponent = steps[currentStep].component

  return (
    <CurrentStepComponent 
      formData={formData}
      updateFormData={(newData: any) => setFormData({...formData, ...newData})}
    />
  )
} 