import { GrantContextType } from "@/context/GrantContext";

export async function submitGrantApplication(grantData: GrantContextType["grantData"]) {
  try {
    // Validate all required fields are present
    const validationErrors = validateGrantData(grantData);
    if (validationErrors.length > 0) {
      throw new Error(`Incomplete application: ${validationErrors.join(", ")}`);
    }

    // You would replace this with your actual API endpoint
    const response = await fetch('/api/submit-grant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grantData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit grant application');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error submitting grant application:', error);
    throw error;
  }
}

function validateGrantData(data: GrantContextType["grantData"]): string[] {
  const errors: string[] = [];

  // Organization validation
  if (!data.organization.name) errors.push("Organization name is required");
  if (!data.organization.mission) errors.push("Mission statement is required");

  // Project validation
  if (!data.project.goals) errors.push("Project goals are required");
  if (!data.project.startDate) errors.push("Start date is required");
  if (!data.project.budget) errors.push("Budget is required");

  // Team validation
  if (data.team.members.length === 0) errors.push("At least one team member is required");

  // Preliminary data validation
  if (!data.preliminary.impact) errors.push("Previous impact information is required");
  if (!data.preliminary.metrics) errors.push("Key metrics are required");

  return errors;
}

export async function saveGrantDraft(grantData: GrantContextType["grantData"]) {
  try {
    // You would replace this with your actual API endpoint
    const response = await fetch('/api/save-draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grantData),
    });

    if (!response.ok) {
      throw new Error('Failed to save draft');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
} 