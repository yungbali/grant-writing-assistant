ORGANIZATION_PROMPTS = {
    "mission_alignment": """
    Analyze the alignment between the organization's mission and the proposed project:
    
    Organization Mission:
    {mission}
    
    Project Description:
    {project}
    
    Provide a detailed analysis of:
    1. Mission alignment score (1-10)
    2. Specific alignment points
    3. Potential misalignments
    4. Recommendations for better alignment
    """,
    # Add more prompts...
}

BUDGET_PROMPTS = {
    "cost_effectiveness": """
    Analyze the cost-effectiveness of the proposed budget:
    
    Budget Details:
    {budget_details}
    
    Evaluate:
    1. Cost-effectiveness score (1-10)
    2. Value for money analysis
    3. Potential cost optimizations
    4. Budget allocation effectiveness
    """,
    # Add more prompts...
}

# Add other prompt categories... 