import requests
import os
from dotenv import load_dotenv

load_dotenv()

def test_api_connection():
    NVIDIA_API_ENDPOINT = 'https://api.nvidia.com/v1/llm/completions'
    
    headers = {
        'Authorization': f"Bearer {os.getenv('NVIDIA_API_KEY')}",
        'Content-Type': 'application/json'
    }
    
    payload = {
        'model': 'nvidia/llama-3.1-nemotron-70b-instruct',
        'messages': [
            {'role': 'user', 'content': 'Hello, how are you?'}
        ],
        'temperature': 0.7,
        'max_tokens': 100
    }
    
    try:
        print("Making API request...")
        print(f"Using API Key: {os.getenv('NVIDIA_API_KEY')[:10]}...")
        response = requests.post(NVIDIA_API_ENDPOINT, headers=headers, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_api_connection() 