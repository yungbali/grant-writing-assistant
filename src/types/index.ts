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
  
  export interface FormData {
    organizationName: string;
    projectTitle: string;
    projectDescription: string;
    preliminaryData: string;
    teamMembers: {
      name: string;
      role: string;
      expertise: string;
      publications?: string;
    }[];
    timeline: {
      startDate: string;
      endDate: string;
      milestones: { date: string; description: string }[];
    };
    budget: {
      total: number;
      breakdown: { category: string; amount: number; justification: string }[];
    };
  }
  
  export interface AIContent {
    draftSuggestions: string;
    strengthAnalysis: string[];
    weaknessAnalysis: string[];
    readabilityScore: number;
    impactScore: number;
  }