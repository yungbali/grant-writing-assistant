from typing import Dict, List
import os
from dotenv import load_dotenv
import streamlit as st
from .openai_client import OpenAIClient
from .specialized_agents import (
    OrganizationAnalyzer,
    BudgetPlanner,
    WritingEnhancer,
    DataAnalyzer,
    TeamEvaluator
)

load_dotenv()

class MasterAgent:
    def __init__(self):
        self.openai_client = OpenAIClient()
        self.agents = {
            'organization': OrganizationAnalyzer(self.openai_client),
            'budget': BudgetPlanner(self.openai_client),
            'writing': WritingEnhancer(self.openai_client),
            'data': DataAnalyzer(self.openai_client),
            'team': TeamEvaluator(self.openai_client)
        }
    
    async def coordinate(self, task: str, data: Dict) -> Dict:
        """Coordinates between different specialized agents using chain of thought"""
        st.session_state.agent_status = 'working'
        
        if task == 'full_review':
            results = {}
            thought_chain = []
            
            for agent_name, agent in self.agents.items():
                with st.status(f"🤖 {agent_name.title()} Agent Analyzing...", expanded=True):
                    # Get agent analysis
                    analysis = await agent.analyze(data)
                    results[agent_name] = analysis
                    
                    # Add to thought chain
                    thought_chain.append({
                        "role": "assistant",
                        "content": f"Analysis from {agent_name} agent:\n{analysis}"
                    })
                    
                    st.write(f"✅ {agent_name.title()} analysis complete")
            
            # Final synthesis using chain of thought
            synthesis = await self._synthesize_results(results, thought_chain)
            return synthesis
        
        # Single agent tasks
        agent = self.agents.get(task)
        if agent:
            return await agent.analyze(data)
        
        return {"error": "Invalid task specified"}

    async def _synthesize_results(self, results: Dict, thought_chain: List) -> Dict:
        """Synthesizes results using chain of thought reasoning"""
        synthesis_prompt = {
            "role": "system",
            "content": """Synthesize the analyses from different agents into a cohesive review. 
            Consider how different aspects interact and impact each other."""
        }
        
        thought_chain.insert(0, synthesis_prompt)
        
        final_synthesis = await self.openai_client.chain_of_thought(thought_chain)
        
        return {
            "overall_analysis": final_synthesis,
            "individual_results": results,
            "thought_process": thought_chain
        }