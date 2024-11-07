SYSTEM_PROMPTS = {
    "organization": """Analyze the organization's grant proposal with these steps:
1. Mission Alignment Analysis
2. Capacity Assessment
3. Track Record Evaluation
4. Impact Potential
5. Recommendations""",

    "budget": """Analyze the budget proposal with these steps:
1. Cost Breakdown Analysis
2. Budget Justification Review
3. Cost-Effectiveness Assessment
4. Financial Sustainability
5. Budget Recommendations""",

    "writing": """Enhance the grant writing with these steps:
1. Clarity Assessment
2. Impact Statement Analysis
3. Technical Language Review
4. Narrative Flow Evaluation
5. Writing Recommendations""",

    "data": """Analyze the preliminary data with these steps:
1. Data Quality Assessment
2. Statistical Significance
3. Methodology Review
4. Results Interpretation
5. Data Recommendations""",

    "team": """Evaluate the team composition with these steps:
1. Expertise Assessment
2. Role Distribution Analysis
3. Track Record Review
4. Collaboration Potential
5. Team Recommendations"""
}

ORGANIZATION_PROMPTS = {
    "mission_alignment": """Analyze the alignment between:
Mission: {mission}
Project: {project}
    
Provide a score out of 10 and detailed explanation.""",
    
    "capacity": """Evaluate organizational capacity for:
{project_description}

Consider resources, experience, and infrastructure."""
}

BUDGET_PROMPTS = {
    "cost_analysis": """Review the budget breakdown:
{budget_details}

Evaluate reasonableness and completeness.""",
    
    "sustainability": """Assess financial sustainability for:
{project_details}

Consider long-term viability and funding sources."""
}

WRITING_PROMPTS = {
    "clarity": """Review writing clarity for:
{content}

Suggest improvements for clarity and impact.""",
    
    "technical": """Evaluate technical writing in:
{content}

Ensure accuracy and appropriate terminology."""
}

DATA_PROMPTS = {
    "methodology": """Review research methodology:
{methodology}

Evaluate approach and rigor.""",
    
    "results": """Analyze preliminary results:
{data}

Assess significance and implications."""
}

TEAM_PROMPTS = {
    "expertise": """Evaluate team expertise:
{team_details}

Assess qualification alignment with project needs.""",
    
    "collaboration": """Review team structure:
{team_composition}

Evaluate roles and collaboration potential."""
}