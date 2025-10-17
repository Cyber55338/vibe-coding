import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getAllChallenges = async () => {
  const challenges = await prisma.challenge.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      module: true,
      difficulty: true,
      estimatedTime: true,
      concepts: true,
      order: true,
    },
    orderBy: [
      { module: 'asc' },
      { order: 'asc' }
    ]
  });

  return challenges;
};

export const getChallengesByModule = async (module: string) => {
  const challenges = await prisma.challenge.findMany({
    where: { module },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      difficulty: true,
      estimatedTime: true,
      concepts: true,
      order: true,
    },
    orderBy: { order: 'asc' }
  });

  if (challenges.length === 0) {
    throw new AppError('Module not found', 404);
  }

  return challenges;
};

export const getChallengeBySlug = async (slug: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      instructions: true,
      starterCode: true,
      module: true,
      difficulty: true,
      estimatedTime: true,
      concepts: true,
      testCases: true,
      hints: true,
      order: true,
    }
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  return challenge;
};

export const getChallenge = async (id: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
  });

  if (!challenge) {
    throw new AppError('Challenge not found', 404);
  }

  return challenge;
};
