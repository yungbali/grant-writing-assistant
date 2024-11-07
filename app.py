import streamlit as st
import os
import requests
import openai
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Debug mode
DEBUG = True

def debug_print(message):
    if DEBUG:
        st.sidebar.text(message)

class ChatAPI:
    def __init__(self):
        self.nvidia_api_key = os.getenv('NVIDIA_API_KEY')
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        self.nvidia_url = "https://integrate.api.nvidia.com/v1/chat/completions"
        
    def nvidia_chat(self, messages):
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": f"Bearer {self.nvidia_api_key}"
        }
        
        payload = {
            "model": "nvidia/llama-3.1-nemotron-70b-instruct",
            "max_tokens": 1024,
            "stream": False,
            "temperature": 0.5,
            "top_p": 1,
            "messages": messages
        }
        
        try:
            debug_print(f"Sending request to NVIDIA API...")
            debug_print(f"Payload: {json.dumps(payload, indent=2)}")
            
            response = requests.post(self.nvidia_url, json=payload, headers=headers)
            debug_print(f"Status Code: {response.status_code}")
            debug_print(f"Response: {response.text}")
            
            if response.status_code == 200:
                return response.json()['choices'][0]['message']['content']
            else:
                st.error(f"NVIDIA API Error: {response.status_code}")
                st.error(response.text)
                return None
                
        except Exception as e:
            st.error(f"Error: {str(e)}")
            return None

    def openai_chat(self, messages):
        try:
            client = openai.OpenAI(api_key=self.openai_api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            return response.choices[0].message.content
        except Exception as e:
            st.error(f"OpenAI API Error: {str(e)}")
            return None

# Initialize chat API
chat_api = ChatAPI()

# Configure Streamlit page
st.set_page_config(page_title="AI Chat", page_icon="🤖")

# Constants
NVIDIA_MODEL = 'nvidia/llama-3.1-nemotron-70b-instruct'
OPENAI_MODEL = 'gpt-3.5-turbo'

# Initialize chat history
if 'messages' not in st.session_state:
    st.session_state.messages = [
        {'role': 'system', 'content': 'You are a helpful AI assistant.'}
    ]
if 'api_metrics' not in st.session_state:
    st.session_state.api_metrics = []

st.title("AI Chat Interface")

# Sidebar for API selection
with st.sidebar:
    st.header("Settings")
    api_choice = st.radio(
        "Select API",
        ["NVIDIA", "OpenAI"],
        key="api_choice"
    )
    
    # Model temperature
    temperature = st.slider(
        "Temperature",
        min_value=0.0,
        max_value=1.0,
        value=0.7,
        step=0.1
    )

# Display chat messages
for message in st.session_state.messages[1:]:  # Skip system message
    with st.chat_message(message['role']):
        st.write(message['content'])

# Chat input
if prompt := st.chat_input("What would you like to know?"):
    # Add user message
    st.session_state.messages.append({'role': 'user', 'content': prompt})
    with st.chat_message('user'):
        st.write(prompt)
    
    # Get response
    with st.chat_message('assistant'):
        with st.spinner('Thinking...'):
            if api_choice == 'NVIDIA':
                response = chat_api.nvidia_chat(st.session_state.messages)
            else:
                response = chat_api.openai_chat(st.session_state.messages)
            
            if response:
                st.write(response)
                st.session_state.messages.append({'role': 'assistant', 'content': response})
            else:
                st.error('Failed to get response from API')

# Control buttons
col1, col2 = st.columns(2)
with col1:
    if st.button('Clear Chat'):
        st.session_state.messages = [
            {'role': 'system', 'content': 'You are a helpful AI assistant.'}
        ]
        st.rerun()

with col2:
    if st.button('Export Chat'):
        chat_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in st.session_state.messages])
        st.download_button(
            'Download Chat',
            chat_text,
            file_name='chat_history.txt',
            mime='text/plain'
        )
    
    