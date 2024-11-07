import streamlit as st
import asyncio
import os
from dotenv import load_dotenv
from agents.master_agent import MasterAgent

# Load environment variables
load_dotenv()

# Verify API key is loaded
if not os.getenv("OPENAI_API_KEY"):
    st.error("OpenAI API key not found. Please check your .env file.")
    st.stop()

# Page config
st.set_page_config(
    page_title="Grant Writing Assistant",
    page_icon="📝",
    layout="wide"
)

# Initialize session state
if 'grant_data' not in st.session_state:
    st.session_state.grant_data = {}
if 'analysis_results' not in st.session_state:
    st.session_state.analysis_results = {}
if 'current_step' not in st.session_state:
    st.session_state.current_step = 0

# Initialize agents
master_agent = MasterAgent()

def render_organization_form():
    st.subheader("Organization Profile")
    org_name = st.text_input("Organization Name", key="org_name")
    mission = st.text_area("Mission Statement", key="mission")
    project_title = st.text_input("Project Title", key="project_title")
    project_desc = st.text_area("Project Description", key="project_desc")
    
    if all([org_name, mission, project_title, project_desc]):
        st.session_state.grant_data.update({
            "organizationName": org_name,
            "mission": mission,
            "projectTitle": project_title,
            "projectDescription": project_desc
        })
        return True
    return False

def render_preliminary_data():
    st.subheader("Preliminary Data")
    methodology = st.text_area("Methodology", key="methodology")
    prelim_data = st.text_area("Preliminary Results", key="prelim_data")
    expected_results = st.text_area("Expected Outcomes", key="expected_results")
    
    if all([methodology, prelim_data, expected_results]):
        st.session_state.grant_data.update({
            "methodology": methodology,
            "preliminaryData": prelim_data,
            "expectedResults": expected_results
        })
        return True
    return False

def render_team_composition():
    st.subheader("Team Composition")
    
    if 'team_members' not in st.session_state:
        st.session_state.team_members = []
    
    cols = st.columns([3, 2, 2, 1])
    with cols[0]:
        name = st.text_input("Name", key="team_name")
    with cols[1]:
        role = st.text_input("Role", key="team_role")
    with cols[2]:
        expertise = st.text_input("Expertise", key="team_expertise")
    with cols[3]:
        if st.button("Add Member"):
            st.session_state.team_members.append({
                "name": name,
                "role": role,
                "expertise": expertise
            })
    
    if st.session_state.team_members:
        st.write("Team Members:")
        for idx, member in enumerate(st.session_state.team_members):
            st.write(f"{idx + 1}. {member['name']} - {member['role']}")
        
        st.session_state.grant_data["teamMembers"] = st.session_state.team_members
        return True
    return False

async def analyze_grant():
    with st.spinner("Analyzing grant proposal..."):
        results = await master_agent.coordinate('full_review', st.session_state.grant_data)
        st.session_state.analysis_results = results
        
        st.success("Analysis complete!")
        
        # Display results
        st.subheader("Analysis Results")
        
        # Overall score
        if 'overall_score' in results:
            st.metric("Overall Score", f"{results['overall_score']:.1f}/10")
        
        # Individual analyses
        for agent_name, analysis in results.get('individual_results', {}).items():
            with st.expander(f"{agent_name.title()} Analysis"):
                st.write(analysis.get('analysis', ''))
                if 'recommendations' in analysis:
                    st.subheader("Recommendations")
                    for rec in analysis['recommendations']:
                        st.write(f"• {rec}")
        
        # Thought process
        with st.expander("AI Thought Process"):
            for thought in results.get('thought_process', []):
                if thought['role'] == 'assistant':
                    st.write(thought['content'])

def main():
    st.title("🤖 Grant Writing Assistant")
    
    # Sidebar
    with st.sidebar:
        st.header("Navigation")
        steps = ["Organization Profile", "Preliminary Data", "Team Composition", "AI Review"]
        current_step = st.radio("Current Step", steps, index=st.session_state.current_step)
        st.session_state.current_step = steps.index(current_step)
        
        if st.button("Clear All Data"):
            st.session_state.grant_data = {}
            st.session_state.analysis_results = {}
            st.session_state.team_members = []
            st.rerun()
    
    # Main content
    if st.session_state.current_step == 0:
        if render_organization_form():
            st.success("Organization profile complete!")
    
    elif st.session_state.current_step == 1:
        if render_preliminary_data():
            st.success("Preliminary data complete!")
    
    elif st.session_state.current_step == 2:
        if render_team_composition():
            st.success("Team composition complete!")
    
    elif st.session_state.current_step == 3:
        if st.button("Run AI Analysis"):
            asyncio.run(analyze_grant())

if __name__ == "__main__":
    main() 