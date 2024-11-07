import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface GrantOpportunity {
  id: string;
  title: string;
  funder: string;
  amount: { min: number; max: number };
  deadline: string;
  eligibility: string[];
  focusAreas: string[];
  requirements: string[];
  successRate: number;
  matchScore: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { organizationProfile, filters } = await req.json();

    // First, get AI analysis of the organization profile
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a grant matching specialist who analyzes organizations and their projects to identify key characteristics for grant matching."
        },
        {
          role: "user",
          content: `Analyze this organization and project for grant matching:
            Organization: ${organizationProfile.organizationName}
            Project: ${organizationProfile.projectTitle}
            Description: ${organizationProfile.projectDescription}
            Budget: ${JSON.stringify(organizationProfile.budget)}
            
            Identify:
            1. Key focus areas
            2. Project scope and scale
            3. Organizational capacity
            4. Innovation factors
            5. Impact potential`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Mock grant database - In production, this would be a real database query
    const mockGrants: GrantOpportunity[] = [
      {
        id: '1',
        title: 'Innovation in Technology Grant',
        funder: 'Tech Foundation',
        amount: { min: 50000, max: 150000 },
        deadline: '2024-12-31',
        eligibility: ['Non-profit', 'Educational institutions'],
        focusAreas: ['Technology', 'Education'],
        requirements: ['Project proposal', 'Budget plan', 'Timeline'],
        successRate: 0.25,
        matchScore: 85
      },
      // Add more mock grants...
    ];

    // Filter grants based on criteria
    const filteredGrants = mockGrants.filter(grant => {
      if (filters.minAmount && grant.amount.max < filters.minAmount) return false;
      if (filters.maxAmount !== Infinity && grant.amount.min > filters.maxAmount) return false;
      if (filters.deadline && new Date(grant.deadline) < new Date(filters.deadline)) return false;
      if (filters.focusArea && !grant.focusAreas.includes(filters.focusArea)) return false;
      return true;
    });

    return NextResponse.json(filteredGrants);
  } catch (error) {
    console.error('Grant matching error:', error);
    return NextResponse.json({ error: 'Error matching grants' }, { status: 500 });
  }
} 