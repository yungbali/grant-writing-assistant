from typing import Dict, List
import openai
import os
from dotenv import load_dotenv
from .prompts import SYSTEM_PROMPTS

class OpenAIClient:
    def __init__(self):
        load_dotenv()
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
    async def chain_of_thought(self, messages: List[Dict], agent_type: str = None, temperature: float = 0.7) -> str:
        try:
            # Add system prompt if agent_type is specified
            if agent_type and agent_type in SYSTEM_PROMPTS:
                messages.insert(0, {
                    "role": "system",
                    "content": SYSTEM_PROMPTS[agent_type]
                })
            
            # Add chain of thought instruction
            cot_prompt = """Please approach this step-by-step:
            1. Analyze the input
            2. Consider relevant factors
            3. Form initial thoughts
            4. Evaluate alternatives
            5. Make recommendations
            
            Format your response with clear headings for each step."""
            
            messages.insert(1, {"role": "system", "content": cot_prompt})
            
            response = await self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=messages,
                temperature=temperature
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI API Error: {str(e)}")
            return None