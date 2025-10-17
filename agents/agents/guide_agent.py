from typing import List, Optional, Dict
import re

class GuideAgent:
    """
    Guide Agent provides progressive hints to learners.
    5 levels: Conceptual → Syntax → Logic → Implementation → Solution
    """

    def __init__(self):
        self.hint_templates = {
            1: "conceptual",  # High-level concept
            2: "syntax",      # Syntax guidance
            3: "logic",       # Logic structure
            4: "implementation",  # Specific steps
            5: "solution"     # Direct solution
        }

    async def generate_hint(
        self,
        challenge_id: str,
        user_code: str,
        hint_level: int,
        previous_attempts: Optional[List[dict]] = None
    ) -> dict:
        """
        Generate a contextual hint based on the user's progress.
        """
        # Analyze what the user has tried
        code_analysis = self._analyze_user_code(user_code)

        # Determine hint type
        hint_type = self.hint_templates.get(hint_level, "conceptual")

        # Generate hint based on level
        hint_text = self._generate_hint_text(
            challenge_id=challenge_id,
            hint_level=hint_level,
            hint_type=hint_type,
            code_analysis=code_analysis,
            previous_attempts=previous_attempts
        )

        return {
            "hint": hint_text,
            "level": hint_level,
            "hint_type": hint_type
        }

    def _analyze_user_code(self, code: str) -> Dict:
        """
        Analyze what the user has already implemented.
        """
        analysis = {
            "has_function": bool(re.search(r'function\s+\w+', code)),
            "has_return": 'return' in code,
            "has_parameters": bool(re.search(r'function\s+\w+\s*\([^)]+\)', code)),
            "has_conditionals": 'if' in code or '?' in code,
            "has_loops": 'for' in code or 'while' in code,
            "has_operators": any(op in code for op in ['+', '-', '*', '/', '%']),
            "code_length": len(code.strip()),
            "is_empty": len(code.strip()) == 0
        }
        return analysis

    def _generate_hint_text(
        self,
        challenge_id: str,
        hint_level: int,
        hint_type: str,
        code_analysis: Dict,
        previous_attempts: Optional[List[dict]]
    ) -> str:
        """
        Generate the actual hint text based on context.
        """
        # This is a simplified version. In production, this would use
        # the OpenAI API or a local LLM to generate contextual hints.

        if hint_level == 1:
            # Conceptual hint
            if code_analysis["is_empty"]:
                return "Think about what the problem is asking. What needs to be returned?"
            else:
                return "You're on the right track. Consider the core concept being tested here."

        elif hint_level == 2:
            # Syntax hint
            if not code_analysis["has_function"]:
                return "You need to define a function. Use the 'function' keyword."
            elif not code_analysis["has_return"]:
                return "Don't forget to return a value from your function."
            else:
                return "Check your syntax. Are all parentheses and brackets matched?"

        elif hint_level == 3:
            # Logic hint
            return "Break down the problem into steps. What operations need to happen?"

        elif hint_level == 4:
            # Implementation hint
            return "Here's a specific step: focus on implementing the main logic first."

        elif hint_level == 5:
            # Solution hint
            return "You're very close! The solution follows this pattern: [function structure with return statement]"

        return "Keep trying! You can do this."
