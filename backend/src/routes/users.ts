import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import {
  getUserProfile,
  updateUserProfile,
  getUserProgress,
  getUserSkills,
} from '../services/userService';

const router = express.Router();

// GET /api/users/me - Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await getUserProfile(req.userId!);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/me - Update user profile
router.patch('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await updateUserProfile(req.userId!, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me/progress - Get user progress
router.get('/me/progress', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const progress = await getUserProgress(req.userId!);
    res.json(progress);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me/skills - Get user skills
router.get('/me/skills', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const skills = await getUserSkills(req.userId!);
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

export default router;
