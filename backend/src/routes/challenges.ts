import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  getAllChallenges,
  getChallengeBySlug,
  getChallengesByModule,
  getChallenge,
} from '../services/challengeService';

const router = express.Router();

// GET /api/challenges - Get all challenges
router.get('/', async (req, res, next) => {
  try {
    const challenges = await getAllChallenges();
    res.json(challenges);
  } catch (error) {
    next(error);
  }
});

// GET /api/challenges/module/:module - Get challenges by module
router.get('/module/:module', async (req, res, next) => {
  try {
    const challenges = await getChallengesByModule(req.params.module);
    res.json(challenges);
  } catch (error) {
    next(error);
  }
});

// GET /api/challenges/:slug - Get single challenge by slug
router.get('/:slug', authenticate, async (req, res, next) => {
  try {
    const challenge = await getChallengeBySlug(req.params.slug);
    res.json(challenge);
  } catch (error) {
    next(error);
  }
});

export default router;
