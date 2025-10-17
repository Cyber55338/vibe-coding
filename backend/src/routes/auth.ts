import express from 'express';
import { register, login, refreshToken, logout } from '../services/authService';
import { strictRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', strictRateLimiter, async (req, res, next) => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login - Login user
router.post('/login', strictRateLimiter, async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', async (req, res, next) => {
  try {
    const result = await refreshToken(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', async (req, res, next) => {
  try {
    await logout(req.body);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
