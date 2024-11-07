import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { task, ...data } = await req.json();

    let prompt = '';
    switch (task) {
      case 'analyzePreliminaryData':
        prompt = `Analyze the following preliminary research data for a grant proposal:
          ${data.preliminaryData}
          
          Provide:
          1. Assessment of data strength
          2. Suggestions for additional data needed
          3. Potential impact implications`;
        break;

      case 'analyzeProposal':
        prompt = `Review this grant proposal:
          Organization: ${data.formData.organizationName}
          Project: ${data.formData.projectTitle}
          Description: ${data.formData.projectDescription}
          Team: ${JSON.stringify(data.formData.teamMembers)}
          Timeline: ${JSON.stringify(data.formData.timeline)}
          Budget: ${JSON.stringify(data.formData.budget)}
          
          Provide a comprehensive analysis including:
          1. Overall strength score (1-10)
          2. Impact potential score (1-10)
          3. Key strengths (bullet points)
          4. Areas for improvement (bullet points)
          5. Specific suggestions for enhancement
          6. Budget efficiency assessment
          7. Timeline feasibility check`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid task type' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an experienced grant reviewer and writer with expertise in analyzing grant proposals and providing constructive feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({ 
      result: response.choices[0].message.content,
      status: 'success' 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ 
      error: 'An error occurred while processing your request',
      status: 'error' 
    }, { status: 500 });
  }
} 