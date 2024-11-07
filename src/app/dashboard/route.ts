import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace this with your actual data fetching logic
    const data = {
      success: true,
      applications: [], // Your applications data
      stats: {
        totalGrants: 0,
        activeApplications: 0,
        successRate: 0,
        totalFunding: 0,
      }
    };
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 