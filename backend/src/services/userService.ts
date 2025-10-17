import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      currentLevel: true,
      totalXP: true,
      createdAt: true,
      lastActiveAt: true,
    }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUserProfile = async (userId: string, data: UpdateProfileData) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      currentLevel: true,
      totalXP: true,
    }
  });

  return user;
};

export const getUserProgress = async (userId: string) => {
  // Get all attempts by user
  const attempts = await prisma.attempt.findMany({
    where: { userId },
    include: {
      challenge: {
        select: {
          slug: true,
          title: true,
          module: true,
          difficulty: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Get completed challenges (unique)
  const completedChallenges = attempts
    .filter(a => a.completed)
    .reduce((acc, attempt) => {
      if (!acc.some(a => a.challengeId === attempt.challengeId)) {
        acc.push(attempt);
      }
      return acc;
    }, [] as typeof attempts);

  // Calculate statistics by module
  const moduleStats = attempts.reduce((acc, attempt) => {
    const module = attempt.challenge.module;
    if (!acc[module]) {
      acc[module] = {
        totalAttempts: 0,
        completedChallenges: 0,
        averageScore: 0,
        totalScore: 0,
      };
    }
    acc[module].totalAttempts++;
    if (attempt.completed) {
      acc[module].completedChallenges++;
      acc[module].totalScore += attempt.overallScore;
    }
    return acc;
  }, {} as Record<string, any>);

  // Calculate averages
  Object.keys(moduleStats).forEach(module => {
    const stats = moduleStats[module];
    if (stats.completedChallenges > 0) {
      stats.averageScore = stats.totalScore / stats.completedChallenges;
    }
    delete stats.totalScore;
  });

  return {
    totalAttempts: attempts.length,
    completedChallenges: completedChallenges.length,
    moduleStats,
    recentAttempts: attempts.slice(0, 10),
  };
};

export const getUserSkills = async (userId: string) => {
  const skills = await prisma.userSkill.findMany({
    where: { userId },
    orderBy: { proficiency: 'desc' }
  });

  return skills;
};
