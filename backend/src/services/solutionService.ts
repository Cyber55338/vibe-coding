import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

interface CreateSolutionData {
  challengeId: string;
  code: string;
  language: string;
  metrics: any;
  visibility?: string;
}

export const createSolution = async (userId: string, data: CreateSolutionData) => {
  const { challengeId, code, language, metrics, visibility = 'public' } = data;

  // Check if challenge exists
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId }
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  // Create solution
  const solution = await prisma.solution.create({
    data: {
      userId,
      challengeId,
      code,
      language,
      metrics,
      visibility,
    },
    include: {
      user: {
        select: {
          username: true,
          avatarUrl: true,
        }
      }
    }
  });

  return solution;
};

export const getSolutionsByChallenge = async (challengeId: string) => {
  const solutions = await prisma.solution.findMany({
    where: {
      challengeId,
      visibility: 'public'
    },
    include: {
      user: {
        select: {
          username: true,
          avatarUrl: true,
        }
      }
    },
    orderBy: {
      upvotes: 'desc'
    },
    take: 50
  });

  return solutions;
};

export const upvoteSolution = async (userId: string, solutionId: string) => {
  // Check if already upvoted
  const existingUpvote = await prisma.solutionUpvote.findUnique({
    where: {
      userId_solutionId: {
        userId,
        solutionId
      }
    }
  });

  if (existingUpvote) {
    // Remove upvote
    await prisma.solutionUpvote.delete({
      where: {
        userId_solutionId: {
          userId,
          solutionId
        }
      }
    });

    await prisma.solution.update({
      where: { id: solutionId },
      data: {
        upvotes: {
          decrement: 1
        }
      }
    });

    return { upvoted: false };
  } else {
    // Add upvote
    await prisma.solutionUpvote.create({
      data: {
        userId,
        solutionId
      }
    });

    await prisma.solution.update({
      where: { id: solutionId },
      data: {
        upvotes: {
          increment: 1
        }
      }
    });

    return { upvoted: true };
  }
};
