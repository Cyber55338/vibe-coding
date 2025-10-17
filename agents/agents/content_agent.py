from typing import List, Dict

class ContentAgent:
    """
    Content Agent generates new challenges based on specifications.
    """

    def __init__(self):
        self.challenge_templates = {
            "sequence-station": {
                "theme": "Sequential logic and basic operations",
                "focus": "Functions, variables, operators"
            },
            "loop-gardens": {
                "theme": "Iteration and repetition",
                "focus": "Loops, arrays, iteration"
            }
        }

    async def generate_challenge(
        self,
        module: str,
        difficulty: int,
        concepts: List[str]
    ) -> dict:
        """
        Generate a new challenge based on specifications.
        """
        # This is a simplified version. In production, this would use
        # AI to generate varied and creative challenges.

        template = self.challenge_templates.get(module, {})

        # Generate challenge based on difficulty and concepts
        challenge = {
            "title": self._generate_title(concepts, difficulty),
            "description": self._generate_description(concepts, difficulty),
            "instructions": self._generate_instructions(concepts),
            "starter_code": self._generate_starter_code(concepts),
            "test_cases": self._generate_test_cases(concepts, difficulty),
            "hints": self._generate_hints(concepts, difficulty)
        }

        return challenge

    def _generate_title(self, concepts: List[str], difficulty: int) -> str:
        """Generate challenge title."""
        main_concept = concepts[0] if concepts else "Logic"
        return f"{main_concept} Challenge (Level {difficulty})"

    def _generate_description(self, concepts: List[str], difficulty: int) -> str:
        """Generate challenge description."""
        return f"Practice {', '.join(concepts).lower()} in this level {difficulty} challenge."

    def _generate_instructions(self, concepts: List[str]) -> str:
        """Generate detailed instructions."""
        return f"Create a function that demonstrates understanding of {', '.join(concepts).lower()}."

    def _generate_starter_code(self, concepts: List[str]) -> str:
        """Generate starter code template."""
        return """function solution() {
  // Write your code here

}"""

    def _generate_test_cases(self, concepts: List[str], difficulty: int) -> List[dict]:
        """Generate test cases."""
        # Basic test case structure
        return [
            {
                "input": None,
                "expectedOutput": "placeholder",
                "description": "Test case 1"
            }
        ]

    def _generate_hints(self, concepts: List[str], difficulty: int) -> List[str]:
        """Generate progressive hints."""
        return [
            f"Think about how {concepts[0]} works in JavaScript",
            "Consider the basic syntax and structure",
            "Break the problem into smaller steps",
            "Look at similar examples you've completed",
            "The solution uses standard JavaScript patterns"
        ]
