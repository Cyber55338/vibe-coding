import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import {
  createSolution,
  getSolutionsByChallenge,
  upvoteSolution,
} from '../services/solutionService';

const router = express.Router();

// POST /api/solutions - Create new solution
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const solution = await createSolution(req.userId!, req.body);
    res.status(201).json(solution);
  } catch (error) {
    next(error);
  }
});

// GET /api/solutions/challenge/:challengeId - Get solutions for a challenge
router.get('/challenge/:challengeId', async (req, res, next) => {
  try {
    const solutions = await getSolutionsByChallenge(req.params.challengeId);
    res.json(solutions);
  } catch (error) {
    next(error);
  }
});

// POST /api/solutions/:solutionId/upvote - Upvote a solution
router.post('/:solutionId/upvote', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const result = await upvoteSolution(req.userId!, req.params.solutionId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
