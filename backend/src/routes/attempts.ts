import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import {
  createAttempt,
  getAttemptsByChallenge,
  getUserAttempts,
} from '../services/attemptService';

const router = express.Router();

// POST /api/attempts - Create new attempt
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const attempt = await createAttempt(req.userId!, req.body);
    res.status(201).json(attempt);
  } catch (error) {
    next(error);
  }
});

// GET /api/attempts/challenge/:challengeId - Get attempts for a challenge
router.get('/challenge/:challengeId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const attempts = await getAttemptsByChallenge(req.userId!, req.params.challengeId);
    res.json(attempts);
  } catch (error) {
    next(error);
  }
});

// GET /api/attempts/me - Get user's all attempts
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const attempts = await getUserAttempts(req.userId!);
    res.json(attempts);
  } catch (error) {
    next(error);
  }
});

export default router;
