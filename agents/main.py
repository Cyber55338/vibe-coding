from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from agents.guide_agent import GuideAgent
from agents.analyzer_agent import AnalyzerAgent
from agents.content_agent import ContentAgent

load_dotenv()

app = FastAPI(title="Vibe Coding AI Agents", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agents
guide_agent = GuideAgent()
analyzer_agent = AnalyzerAgent()
content_agent = ContentAgent()

# Request/Response Models
class HintRequest(BaseModel):
    challenge_id: str
    user_code: str
    hint_level: int
    previous_attempts: Optional[List[dict]] = None

class HintResponse(BaseModel):
    hint: str
    level: int
    hint_type: str  # 'conceptual', 'syntax', 'logic', 'solution'

class AnalysisRequest(BaseModel):
    code: str
    challenge_id: str
    test_results: dict

class AnalysisResponse(BaseModel):
    patterns: List[str]
    complexity: str
    suggestions: List[str]
    strengths: List[str]
    weaknesses: List[str]

class ChallengeGenerationRequest(BaseModel):
    module: str
    difficulty: int
    concepts: List[str]

class ChallengeGenerationResponse(BaseModel):
    title: str
    description: str
    instructions: str
    starter_code: str
    test_cases: List[dict]
    hints: List[str]

# Health check
@app.get("/")
async def root():
    return {
        "status": "ok",
        "service": "Vibe Coding AI Agents",
        "version": "1.0.0"
    }

# Guide Agent endpoints
@app.post("/api/agents/guide/hint", response_model=HintResponse)
async def get_hint(request: HintRequest):
    """
    Get a contextual hint from the Guide Agent based on the user's code and attempt.
    Hints are progressive (5 levels) from conceptual to direct solution.
    """
    try:
        hint = await guide_agent.generate_hint(
            challenge_id=request.challenge_id,
            user_code=request.user_code,
            hint_level=request.hint_level,
            previous_attempts=request.previous_attempts
        )
        return hint
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Analyzer Agent endpoints
@app.post("/api/agents/analyzer/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    """
    Analyze user code for patterns, complexity, and provide feedback.
    """
    try:
        analysis = await analyzer_agent.analyze(
            code=request.code,
            challenge_id=request.challenge_id,
            test_results=request.test_results
        )
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Content Agent endpoints
@app.post("/api/agents/content/generate", response_model=ChallengeGenerationResponse)
async def generate_challenge(request: ChallengeGenerationRequest):
    """
    Generate a new challenge based on module, difficulty, and concepts.
    """
    try:
        challenge = await content_agent.generate_challenge(
            module=request.module,
            difficulty=request.difficulty,
            concepts=request.concepts
        )
        return challenge
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port)
