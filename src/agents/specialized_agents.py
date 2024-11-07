from typing import Dict, List
import os
from dotenv import load_dotenv
from .openai_client import OpenAIClient

load_dotenv()

class BaseAgent:
    def __init__(self, openai_client: OpenAIClient):
        self.client = openai_client
    
    def _extract_score(self, analysis: str) -> float:
        try:
            # Look for score patterns like "Score: 8.5/10" or "Rating: 85%"
            import re
            score_match = re.search(r'(?:Score|Rating):\s*(\d+(?:\.\d+)?)', analysis)
            if score_match:
                return float(score_match.group(1))
            return 0.0
        except:
            return 0.0

    def _extract_recommendations(self, analysis: str) -> List[str]:
        try:
            # Extract recommendations section
            import re
            recommendations = re.findall(r'(?:Recommendation|Suggestion):\s*(.*?)(?:\n|$)', analysis)
            return recommendations
        except:
            return []

class OrganizationAnalyzer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        messages = [
            {
                "role": "system",
                "content": """Analyze the organization's grant proposal with these steps:
                1. Mission Alignment Analysis
                2. Capacity Assessment
                3. Track Record Evaluation
                4. Impact Potential
                5. Recommendations"""
            },
            {
                "role": "user",
                "content": f"""
                Organization: {data.get('organizationName', '')}
                Mission: {data.get('mission', '')}
                Project: {data.get('projectTitle', '')}
                Description: {data.get('projectDescription', '')}
                """
            }
        ]
        
        analysis = await self.client.chain_of_thought(messages)
        return self._parse_analysis(analysis)

class BudgetPlanner(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        messages = [
            {
                "role": "system",
                "content": """Analyze the budget proposal with these steps:
                1. Cost Breakdown Analysis
                2. Budget Justification Review
                3. Cost-Effectiveness Assessment
                4. Financial Sustainability
                5. Budget Recommendations"""
            },
            {
                "role": "user",
                "content": f"""
                Total Budget: {data.get('budget', {}).get('total', '')}
                Breakdown: {data.get('budget', {}).get('breakdown', [])}
                Timeline: {data.get('timeline', {})}
                """
            }
        ]
        
        analysis = await self.client.chain_of_thought(messages)
        return self._parse_analysis(analysis)

class WritingEnhancer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        messages = [
            {
                "role": "system",
                "content": """Enhance the grant writing with these steps:
                1. Clarity Assessment
                2. Impact Statement Analysis
                3. Technical Language Review
                4. Narrative Flow Evaluation
                5. Writing Recommendations"""
            },
            {
                "role": "user",
                "content": f"""
                Project Description: {data.get('projectDescription', '')}
                Methodology: {data.get('methodology', '')}
                Expected Outcomes: {data.get('outcomes', '')}
                """
            }
        ]
        
        analysis = await self.client.chain_of_thought(messages)
        return self._parse_analysis(analysis)

class DataAnalyzer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        messages = [
            {
                "role": "system",
                "content": """Analyze the preliminary data with these steps:
                1. Data Quality Assessment
                2. Statistical Significance
                3. Methodology Review
                4. Results Interpretation
                5. Data Recommendations"""
            },
            {
                "role": "user",
                "content": f"""
                Preliminary Data: {data.get('preliminaryData', '')}
                Methodology: {data.get('methodology', '')}
                Expected Results: {data.get('expectedResults', '')}
                """
            }
        ]
        
        analysis = await self.client.chain_of_thought(messages)
        return self._parse_analysis(analysis)

class TeamEvaluator(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        messages = [
            {
                "role": "system",
                "content": """Evaluate the team composition with these steps:
                1. Expertise Assessment
                2. Role Distribution Analysis
                3. Track Record Review
                4. Collaboration Potential
                5. Team Recommendations"""
            },
            {
                "role": "user",
                "content": f"""
                Team Members: {data.get('teamMembers', [])}
                Project Scope: {data.get('projectDescription', '')}
                Timeline: {data.get('timeline', {})}
                """
            }
        ]
        
        analysis = await self.client.chain_of_thought(messages)
        return self._parse_analysis(analysis)