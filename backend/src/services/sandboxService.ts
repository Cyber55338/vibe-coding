import { VM } from 'vm2';
import { AppError } from '../middleware/errorHandler';

interface TestCase {
  input: any;
  expectedOutput: any;
  description?: string;
}

interface ExecutionResult {
  results: Array<{
    passed: boolean;
    input: any;
    expectedOutput: any;
    actualOutput: any;
    error?: string;
    executionTime: number;
  }>;
  totalPassed: number;
  totalTests: number;
}

export const executeCode = async (
  code: string,
  testCases: any,
  language: string = 'javascript'
): Promise<ExecutionResult> => {
  if (language !== 'javascript') {
    throw new AppError('Only JavaScript is supported currently', 400);
  }

  const tests = Array.isArray(testCases) ? testCases : testCases.tests || [];
  const results: ExecutionResult['results'] = [];

  for (const testCase of tests) {
    const startTime = Date.now();

    try {
      // Create isolated VM
      const vm = new VM({
        timeout: parseInt(process.env.SANDBOX_TIMEOUT || '5000'),
        sandbox: {},
      });

      // Prepare the code with test input
      const wrappedCode = `
        ${code}

        // Execute the main function with test input
        const result = (function() {
          ${testCase.setup || ''}
          const input = ${JSON.stringify(testCase.input)};

          // Try to find and call the main function
          if (typeof solution === 'function') {
            return solution(${typeof testCase.input === 'object' ? '...Object.values(input)' : 'input'});
          } else if (typeof main === 'function') {
            return main(${typeof testCase.input === 'object' ? '...Object.values(input)' : 'input'});
          } else {
            throw new Error('No solution or main function found');
          }
        })();

        result;
      `;

      const actualOutput = vm.run(wrappedCode);
      const executionTime = Date.now() - startTime;

      // Compare output
      const passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);

      results.push({
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput,
        executionTime,
      });
    } catch (error: any) {
      const executionTime = Date.now() - startTime;

      results.push({
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: null,
        error: error.message || 'Execution error',
        executionTime,
      });
    }
  }

  const totalPassed = results.filter(r => r.passed).length;
  const totalTests = results.length;

  return {
    results,
    totalPassed,
    totalTests,
  };
};

export const executeCodeWithTimeout = async (
  code: string,
  timeout: number = 5000
): Promise<any> => {
  const vm = new VM({
    timeout,
    sandbox: {},
  });

  try {
    const result = vm.run(code);
    return { success: true, result };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Execution error'
    };
  }
};
