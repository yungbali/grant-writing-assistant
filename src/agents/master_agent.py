from typing import Dict, List
import streamlit as st
from .specialized_agents import (
    OrganizationAnalyzer,
    BudgetPlanner,
    WritingEnhancer,
    DataAnalyzer,
    TeamEvaluator
)

class MasterAgent:
    def __init__(self):
        self.agents = {
            'organization': OrganizationAnalyzer(),
            'budget': BudgetPlanner(),
            'writing': WritingEnhancer(),
            'data': DataAnalyzer(),
            'team': TeamEvaluator()
        }
        
    async def coordinate(self, task: str, data: Dict) -> Dict:
        """Coordinates between different specialized agents"""
        st.session_state.agent_status = 'working'
        
        if task == 'full_review':
            results = {}
            for agent_name, agent in self.agents.items():
                with st.status(f"🤖 {agent_name.title()} Agent Working...", expanded=True):
                    results[agent_name] = await agent.analyze(data)
                    st.write(f"✅ {agent_name.title()} analysis complete")
            
            return self._synthesize_results(results)
        
        # Single agent tasks
        agent = self.agents.get(task)
        if agent:
            return await agent.analyze(data)
        
        return {"error": "Invalid task specified"}

    def _synthesize_results(self, results: Dict) -> Dict:
        """Combines results from multiple agents into a cohesive response"""
        synthesis = {
            "overall_score": 0,
            "recommendations": [],
            "critical_issues": [],
            "improvements": []
        }
        
        # Combine scores and recommendations
        for result in results.values():
            synthesis["overall_score"] += result.get("score", 0)
            synthesis["recommendations"].extend(result.get("recommendations", []))
            synthesis["critical_issues"].extend(result.get("critical_issues", []))
            synthesis["improvements"].extend(result.get("improvements", []))
        
        synthesis["overall_score"] /= len(results)
        return synthesis 