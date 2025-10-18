import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function seedChallenges() {
  console.log('🌱 Seeding challenges...');

  // Load Module 1 challenges
  const module1Path = path.join(__dirname, '../data/challenges/module1-sequence-station.json');
  const module1Data = JSON.parse(fs.readFileSync(module1Path, 'utf-8'));

  for (const challengeData of module1Data) {
    await prisma.challenge.upsert({
      where: { slug: challengeData.slug },
      update: challengeData,
      create: challengeData,
    });
    console.log(`✓ Created/Updated challenge: ${challengeData.title}`);
  }

  // Load Module 2 challenges
  const module2Path = path.join(__dirname, '../data/challenges/module2-loop-gardens.json');
  const module2Data = JSON.parse(fs.readFileSync(module2Path, 'utf-8'));

  for (const challengeData of module2Data) {
    await prisma.challenge.upsert({
      where: { slug: challengeData.slug },
      update: challengeData,
      create: challengeData,
    });
    console.log(`✓ Created/Updated challenge: ${challengeData.title}`);
  }

  console.log('✅ Challenges seeded successfully!');
}

async function seedAchievements() {
  console.log('🌱 Seeding achievements...');

  const achievements = [
    {
      slug: 'first-challenge',
      name: 'First Steps',
      description: 'Complete your first challenge',
      icon: '🎯',
    },
    {
      slug: 'sequence-master',
      name: 'Sequence Master',
      description: 'Complete all challenges in Sequence Station',
      icon: '🏆',
    },
    {
      slug: 'perfect-score',
      name: 'Perfectionist',
      description: 'Achieve 100% on a challenge',
      icon: '💯',
    },
    {
      slug: 'no-hints',
      name: 'Self-Taught',
      description: 'Complete a challenge without using hints',
      icon: '🧠',
    },
    {
      slug: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a challenge in under 2 minutes',
      icon: '⚡',
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: achievement,
      create: achievement,
    });
    console.log(`✓ Created/Updated achievement: ${achievement.name}`);
  }

  console.log('✅ Achievements seeded successfully!');
}

async function main() {
  try {
    await seedChallenges();
    await seedAchievements();
    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
