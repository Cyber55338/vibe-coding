from typing import List, Dict
import re

class AnalyzerAgent:
    """
    Analyzer Agent evaluates code quality, patterns, and provides feedback.
    """

    def __init__(self):
        self.patterns = {
            "array_methods": ["map", "filter", "reduce", "forEach"],
            "modern_syntax": ["const", "let", "=>", "..."],
            "loops": ["for", "while", "do"],
            "conditionals": ["if", "else", "switch", "?"],
        }

    async def analyze(
        self,
        code: str,
        challenge_id: str,
        test_results: dict
    ) -> dict:
        """
        Analyze code and provide comprehensive feedback.
        """
        # Detect patterns
        detected_patterns = self._detect_patterns(code)

        # Assess complexity
        complexity = self._assess_complexity(code)

        # Generate suggestions
        suggestions = self._generate_suggestions(code, detected_patterns, test_results)

        # Identify strengths
        strengths = self._identify_strengths(code, detected_patterns)

        # Identify weaknesses
        weaknesses = self._identify_weaknesses(code, test_results)

        return {
            "patterns": detected_patterns,
            "complexity": complexity,
            "suggestions": suggestions,
            "strengths": strengths,
            "weaknesses": weaknesses
        }

    def _detect_patterns(self, code: str) -> List[str]:
        """
        Detect coding patterns in the user's solution.
        """
        found_patterns = []

        # Check for array methods
        for method in self.patterns["array_methods"]:
            if f".{method}" in code:
                found_patterns.append(f"array-{method}")

        # Check for modern syntax
        if "=>" in code:
            found_patterns.append("arrow-function")
        if "const" in code or "let" in code:
            found_patterns.append("modern-variables")

        # Check for loops
        if re.search(r'\bfor\s*\(', code):
            found_patterns.append("for-loop")
        if re.search(r'\bwhile\s*\(', code):
            found_patterns.append("while-loop")

        # Check for conditionals
        if re.search(r'\bif\s*\(', code):
            found_patterns.append("conditional")
        if "?" in code and ":" in code:
            found_patterns.append("ternary-operator")

        return found_patterns

    def _assess_complexity(self, code: str) -> str:
        """
        Assess code complexity.
        """
        lines = [line for line in code.split('\n') if line.strip()]
        nesting_level = code.count('{')

        if len(lines) <= 5 and nesting_level <= 2:
            return "simple"
        elif len(lines) <= 15 and nesting_level <= 4:
            return "moderate"
        else:
            return "complex"

    def _generate_suggestions(
        self,
        code: str,
        patterns: List[str],
        test_results: dict
    ) -> List[str]:
        """
        Generate improvement suggestions.
        """
        suggestions = []

        # Suggest modern array methods if using loops
        if "for-loop" in patterns and not any(p.startswith("array-") for p in patterns):
            suggestions.append(
                "Consider using array methods like map(), filter(), or reduce() for cleaner code"
            )

        # Suggest modern syntax
        if "var" in code:
            suggestions.append(
                "Use 'const' or 'let' instead of 'var' for better scoping"
            )

        # Suggest ternary for simple conditionals
        if "conditional" in patterns and code.count("if") == 1 and code.count("{") <= 3:
            suggestions.append(
                "This could be simplified using a ternary operator (condition ? true : false)"
            )

        # Performance suggestions
        if test_results.get("totalTests", 0) > 0:
            avg_time = sum(r.get("executionTime", 0) for r in test_results.get("results", [])) / len(test_results.get("results", [1]))
            if avg_time > 100:
                suggestions.append(
                    "Consider optimizing for performance - execution time is high"
                )

        return suggestions

    def _identify_strengths(self, code: str, patterns: List[str]) -> List[str]:
        """
        Identify positive aspects of the code.
        """
        strengths = []

        if "modern-variables" in patterns:
            strengths.append("Good use of modern JavaScript syntax")

        if "arrow-function" in patterns:
            strengths.append("Clean arrow function syntax")

        if any(p.startswith("array-") for p in patterns):
            strengths.append("Effective use of array methods")

        if "ternary-operator" in patterns:
            strengths.append("Concise conditional logic")

        # Check for meaningful variable names
        if re.search(r'\b(const|let)\s+[a-z][a-zA-Z]{3,}', code):
            strengths.append("Meaningful variable names")

        return strengths

    def _identify_weaknesses(self, code: str, test_results: dict) -> List[str]:
        """
        Identify areas for improvement.
        """
        weaknesses = []

        # Check test results
        if test_results.get("totalPassed", 0) < test_results.get("totalTests", 0):
            weaknesses.append("Some test cases are failing")

        # Check for common issues
        if "var" in code:
            weaknesses.append("Using 'var' instead of modern 'const' or 'let'")

        if len(code.strip()) == 0:
            weaknesses.append("No code submitted")

        # Check for overly complex solutions
        if code.count('{') > 5:
            weaknesses.append("Solution might be overly complex")

        return weaknesses
