"use client"
import React, { createContext, useContext, useState } from 'react';

export interface GrantContextType {
  grantData: any; // Replace with your specific data type
  isStepComplete: (step: number) => boolean;
}

const GrantContext = createContext<GrantContextType | undefined>(undefined);

export function GrantProvider({ children }: { children: React.ReactNode }) {
  const [grantData, setGrantData] = useState({});

  const isStepComplete = (step: number) => {
    // Implement your step validation logic here
    return true;
  };

  return (
    <GrantContext.Provider value={{ grantData, isStepComplete }}>
      {children}
    </GrantContext.Provider>
  );
}

export function useGrant() {
  const context = useContext(GrantContext);
  if (undefined === context) {
    throw new Error('useGrant must be used within a GrantProvider');
  }
  return context;
} 