import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { executeCode } from './sandboxService';
import { analyzeCode } from './analysisService';

const prisma = new PrismaClient();

interface CreateAttemptData {
  challengeId: string;
  code: string;
  language: string;
}

export const createAttempt = async (userId: string, data: CreateAttemptData) => {
  const { challengeId, code, language } = data;

  // Get challenge
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId }
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  // Count previous attempts
  const attemptCount = await prisma.attempt.count({
    where: {
      userId,
      challengeId
    }
  });

  // Execute code against test cases
  const startTime = Date.now();
  const executionResult = await executeCode(code, challenge.testCases, language);
  const timeSpent = Date.now() - startTime;

  // Analyze code quality
  const analysis = await analyzeCode(code, challenge, executionResult);

  // Calculate metrics
  const passedTests = executionResult.results.filter((r: any) => r.passed).length;
  const totalTests = executionResult.results.length;
  const correctness = passedTests / totalTests;

  const metrics = {
    correctness,
    efficiency: analysis.efficiency,
    elegance: analysis.elegance,
    readability: analysis.readability,
  };

  const overallScore = (
    metrics.correctness * 0.4 +
    metrics.efficiency * 0.2 +
    metrics.elegance * 0.2 +
    metrics.readability * 0.2
  );

  const completed = correctness === 1.0;

  // Create attempt
  const attempt = await prisma.attempt.create({
    data: {
      userId,
      challengeId,
      code,
      language,
      testResults: executionResult.results,
      correctness: metrics.correctness,
      efficiency: metrics.efficiency,
      elegance: metrics.elegance,
      readability: metrics.readability,
      overallScore,
      attemptNumber: attemptCount + 1,
      timeSpentMs: BigInt(timeSpent),
      completed,
      analysis: analysis.details,
    },
    include: {
      challenge: {
        select: {
          slug: true,
          title: true,
        }
      }
    }
  });

  // Update user XP if completed
  if (completed && attemptCount === 0) {
    const xpGain = Math.floor(challenge.difficulty * 100);
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: {
          increment: xpGain
        }
      }
    });
  }

  return attempt;
};

export const getAttemptsByChallenge = async (userId: string, challengeId: string) => {
  const attempts = await prisma.attempt.findMany({
    where: {
      userId,
      challengeId
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      code: true,
      language: true,
      correctness: true,
      efficiency: true,
      elegance: true,
      readability: true,
      overallScore: true,
      attemptNumber: true,
      completed: true,
      createdAt: true,
    }
  });

  return attempts;
};

export const getUserAttempts = async (userId: string) => {
  const attempts = await prisma.attempt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      challenge: {
        select: {
          slug: true,
          title: true,
          module: true,
        }
      }
    }
  });

  return attempts;
};
