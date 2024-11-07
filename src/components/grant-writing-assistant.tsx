"use client"
import React, { useState, SetStateAction } from "react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { OrganizationProfile } from "./steps/OrganizationProfile";
import { PreliminaryData } from "./steps/PreliminaryData";
import { TeamComposition } from "./steps/TeamComposition";
// Removed ProjectPlanning due to error
import { AIReview } from "./steps/AIReview";
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "./ui/progress"
import { ChevronRight, ChevronLeft, Save, HelpCircle } from 'lucide-react'
import './grant-writing-assistant.css';
import { useGrant } from "../context/GrantContext";
import { toast, Toaster } from 'react-hot-toast'

const saveGrantData = async (data: any) => {
  // Implement actual save logic here (e.g., API call)
  return Promise.resolve();
};

export default function GrantWritingAssistant() {
  const steps = [
    { title: "Organization Profile", component: OrganizationProfile },
    { title: "Preliminary Data", component: PreliminaryData },
    { title: "Team Composition", component: TeamComposition },
    { title: "AI Review", component: AIReview }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const progress = (currentStep / (steps.length - 1)) * 100;
  const { grantData, isStepComplete } = useGrant();

  const handleSave = async () => {
    try {
      // Implement your save logic here
      await saveGrantData(grantData);
      toast("Your grant application has been saved successfully.", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to save your progress. Please try again.");
    }
  };

  const nextStep = () => {
    if (isStepComplete(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error("Please complete all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Toaster position="top-right" />
      <Card className="p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Grant Writing Assistant</CardTitle>
          <CardDescription className="text-center">Step {currentStep + 1} of {steps.length}</CardDescription>
        </CardHeader>

        {/* Progress bar */}
        <Progress value={progress} className="mb-8" />

        {/* Stepper */}
        <div className="flex justify-between mb-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2 
                  ${currentStep === index ? 'border-primary bg-primary text-white' : 
                    currentStep > index ? 'border-primary bg-primary text-white' : 
                    'border-muted bg-background'}`}
              >
                {currentStep > index ? "✓" : index + 1}
              </div>
              <span className="mt-2 text-sm hidden sm:block text-center max-w-[100px]">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[400px] mb-8 p-4"
          >
            {React.createElement(steps[currentStep].component)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <CardFooter className="flex justify-between border-t pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-[100px]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
            <Button 
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="w-[100px]"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}