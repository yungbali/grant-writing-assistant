import { OrganizationProfile } from "@/components/steps/OrganizationProfile";
import { PreliminaryData } from "@/components/steps/PreliminaryData";
import { TeamComposition } from "@/components/steps/TeamComposition";
import { AIReview } from "@/components/steps/AIReview";

// Make the FormData interface exportable
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

// ... rest of the code ... 