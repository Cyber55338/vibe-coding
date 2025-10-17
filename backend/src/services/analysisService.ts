interface Challenge {
  solution: string;
  difficulty: number;
}

interface ExecutionResult {
  results: Array<{
    passed: boolean;
    executionTime: number;
  }>;
}

interface AnalysisResult {
  efficiency: number;
  elegance: number;
  readability: number;
  details: {
    codeLength: number;
    averageExecutionTime: number;
    complexity: string;
    patterns: string[];
    suggestions: string[];
  };
}

export const analyzeCode = async (
  code: string,
  challenge: Challenge,
  executionResult: ExecutionResult
): Promise<AnalysisResult> => {
  // Calculate efficiency based on execution time
  const avgExecutionTime = executionResult.results.reduce(
    (sum, r) => sum + r.executionTime, 0
  ) / executionResult.results.length;

  // Normalize execution time to 0-1 scale (lower is better)
  const maxAcceptableTime = 1000; // 1 second
  const efficiency = Math.max(0, Math.min(1, 1 - (avgExecutionTime / maxAcceptableTime)));

  // Calculate elegance based on code length and complexity
  const codeLength = code.length;
  const solutionLength = challenge.solution.length;

  // Penalize code that's significantly longer than the solution
  const lengthRatio = codeLength / solutionLength;
  const eleganceFromLength = Math.max(0, Math.min(1, 2 - lengthRatio));

  // Detect code patterns
  const patterns = detectPatterns(code);
  const eleganceFromPatterns = patterns.length > 0 ? 0.8 : 0.5;

  const elegance = (eleganceFromLength + eleganceFromPatterns) / 2;

  // Calculate readability
  const readability = calculateReadability(code);

  // Detect complexity
  const complexity = detectComplexity(code);

  // Generate suggestions
  const suggestions = generateSuggestions(code, patterns, complexity);

  return {
    efficiency,
    elegance,
    readability,
    details: {
      codeLength,
      averageExecutionTime: avgExecutionTime,
      complexity,
      patterns,
      suggestions,
    }
  };
};

function detectPatterns(code: string): string[] {
  const patterns: string[] = [];

  if (code.includes('map(') || code.includes('.map')) {
    patterns.push('array-map');
  }
  if (code.includes('filter(') || code.includes('.filter')) {
    patterns.push('array-filter');
  }
  if (code.includes('reduce(') || code.includes('.reduce')) {
    patterns.push('array-reduce');
  }
  if (code.includes('for (') || code.includes('for(')) {
    patterns.push('for-loop');
  }
  if (code.includes('while (') || code.includes('while(')) {
    patterns.push('while-loop');
  }
  if (code.includes('=>')) {
    patterns.push('arrow-function');
  }
  if (code.includes('function')) {
    patterns.push('function-declaration');
  }
  if (code.includes('const') || code.includes('let')) {
    patterns.push('modern-variables');
  }

  return patterns;
}

function calculateReadability(code: string): number {
  let score = 1.0;

  // Check for proper indentation
  const lines = code.split('\n');
  const hasIndentation = lines.some(line => line.startsWith('  ') || line.startsWith('\t'));
  if (!hasIndentation && lines.length > 3) {
    score -= 0.2;
  }

  // Check for variable names
  const hasMeaningfulNames = /const\s+\w{3,}|let\s+\w{3,}/.test(code);
  if (!hasMeaningfulNames) {
    score -= 0.2;
  }

  // Check for comments
  const hasComments = code.includes('//') || code.includes('/*');
  if (!hasComments && code.length > 200) {
    score -= 0.1;
  }

  // Check for whitespace
  const hasProperSpacing = /\n\s*\n/.test(code);
  if (hasProperSpacing) {
    score += 0.1;
  }

  return Math.max(0, Math.min(1, score));
}

function detectComplexity(code: string): string {
  const lines = code.split('\n').filter(l => l.trim().length > 0).length;

  // Count nested structures
  const nestingLevel = (code.match(/\{/g) || []).length;

  if (lines < 10 && nestingLevel < 3) {
    return 'simple';
  } else if (lines < 30 && nestingLevel < 5) {
    return 'moderate';
  } else {
    return 'complex';
  }
}

function generateSuggestions(code: string, patterns: string[], complexity: string): string[] {
  const suggestions: string[] = [];

  // Suggest using modern array methods
  if (patterns.includes('for-loop') && !patterns.includes('array-map')) {
    suggestions.push('Consider using array methods like map, filter, or reduce for cleaner code');
  }

  // Suggest breaking down complex code
  if (complexity === 'complex') {
    suggestions.push('Consider breaking this into smaller functions for better readability');
  }

  // Suggest adding comments
  if (!code.includes('//') && code.length > 100) {
    suggestions.push('Add comments to explain your logic');
  }

  // Suggest consistent naming
  if (!patterns.includes('modern-variables')) {
    suggestions.push('Use const and let instead of var for better code quality');
  }

  return suggestions;
}
