import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

def test_nvidia_api():
    url = "https://integrate.api.nvidia.com/v1/chat/completions"
    
    # Define the grant writing assistant payload
    grant_assistant_payload = {
        "model": "nvidia/llama-3.1-nemotron-70b-instruct",
        "max_tokens": 1024,
        "stream": False,
        "temperature": 0.5,
        "top_p": 1,
        "stop": None,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "seed": 0,
        "messages": [
            {
                "role": "system",
                "content": """You are an expert grant writing assistant with deep knowledge of grant proposals, funding requirements, and institutional guidelines. Your capabilities include:

1. Document Analysis:
   - Review and analyze grant proposals
   - Identify strengths and weaknesses
   - Suggest improvements for clarity and impact

2. Grant Strategy:
   - Help align projects with funding opportunities
   - Optimize budget presentations
   - Strengthen impact statements
   - Enhance methodology descriptions

3. Specialized Knowledge:
   - Grant writing best practices
   - Funding agency requirements
   - Budget development
   - Project timeline planning
   - Team composition recommendations

4. Review Functions:
   - Technical writing enhancement
   - Budget optimization
   - Timeline feasibility
   - Compliance checking
   - Impact assessment"""
            },
            {
                "role": "user",
                "content": "Hello, I need help with my grant proposal."
            }
        ]
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}"
    }

    print("Sending request to NVIDIA API...")
    print(f"Payload: {json.dumps(grant_assistant_payload)}")

    try:
        response = requests.post(url, json=grant_assistant_payload, headers=headers)
        response.raise_for_status()
        print("Response:", response.text)
        print("Status Code:", response.status_code)
    except requests.exceptions.RequestException as e:
        print(f"Error: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Error response: {e.response.text}") 