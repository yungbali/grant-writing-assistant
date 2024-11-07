export interface GrantOpportunity {
  id: string;
  title: string;
  funder: string;
  amount: {
    min: number;
    max: number;
  };
  deadline: string;
  eligibility: string[];
  focusAreas: string[];
  requirements: string[];
  successRate: number;
  matchScore?: number;
}

export interface GrantAnalysis {
  matchScore: number;
  strengthScore: number;
  readabilityScore: number;
  competitiveness: number;
  suggestions: string[];
  requiredDocuments: string[];
  timeline: {
    deadline: string;
    timeToComplete: number;
    isRealistic: boolean;
  };
} 