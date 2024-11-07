from typing import Dict, List
import openai
import streamlit as st
from .prompts import (
    ORGANIZATION_PROMPTS,
    BUDGET_PROMPTS,
    WRITING_PROMPTS,
    DATA_PROMPTS,
    TEAM_PROMPTS
)

class BaseAgent:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=st.secrets["OPENAI_API_KEY"])
        self.nvidia_api_key = st.secrets["NVIDIA_API_KEY"]
    
    async def _get_completion(self, prompt: str, temperature: float = 0.7) -> str:
        try:
            response = await self.openai_client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature
            )
            return response.choices[0].message.content
        except Exception as e:
            st.error(f"API Error: {str(e)}")
            return None

class OrganizationAnalyzer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        analysis = {
            "mission_alignment": await self._analyze_mission_alignment(data),
            "org_capacity": await self._analyze_capacity(data),
            "track_record": await self._analyze_track_record(data),
            "recommendations": []
        }
        return self._compile_results(analysis)
    
    async def _analyze_mission_alignment(self, data: Dict) -> Dict:
        prompt = ORGANIZATION_PROMPTS["mission_alignment"].format(
            mission=data.get("mission", ""),
            project=data.get("project_description", "")
        )
        response = await self._get_completion(prompt)
        return {"score": self._extract_score(response), "details": response}

class BudgetPlanner(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        budget_data = data.get("budget", {})
        analysis = {
            "cost_effectiveness": await self._analyze_cost_effectiveness(budget_data),
            "allocation": await self._analyze_allocation(budget_data),
            "justification": await self._analyze_justification(budget_data),
            "recommendations": []
        }
        return self._compile_results(analysis)

class WritingEnhancer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        text = data.get("proposal_text", "")
        analysis = {
            "clarity": await self._analyze_clarity(text),
            "impact": await self._analyze_impact(text),
            "suggestions": await self._generate_improvements(text),
            "enhanced_version": await self._enhance_text(text)
        }
        return self._compile_results(analysis)

class DataAnalyzer(BaseAgent):
    async def analyze(self, data: Dict) -> Dict:
        preliminary_data = data.get("preliminary_data", "")
        analysis = {
            "data_quality": await self._analyze_data_quality(preliminary_data),
            "evidence_strength": await self._analyze_evidence(preliminary_data),
            "gaps": await self._identify_gaps(preliminary_data),
            "recommendations": []
        }
        return self._compile_results(analysis)