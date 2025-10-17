import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RefreshTokenData {
  refreshToken: string;
}

interface LogoutData {
  refreshToken: string;
}

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '30d' }
  );

  return { accessToken, refreshToken };
};

export const register = async (data: RegisterData) => {
  const { email, username, password, firstName, lastName } = data;

  // Validate input
  if (!email || !username || !password) {
    throw new AppError('Email, username, and password are required', 400);
  }

  if (password.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400);
  }

  // Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError('Email already registered', 409);
    }
    if (existingUser.username === username) {
      throw new AppError('Username already taken', 409);
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      firstName,
      lastName,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      currentLevel: true,
      totalXP: true,
      createdAt: true,
    }
  });

  // Generate tokens
  const tokens = generateTokens(user.id);

  return {
    user,
    ...tokens,
  };
};

export const login = async (data: LoginData) => {
  const { email, password } = data;

  // Validate input
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  // Update last active
  await prisma.user.update({
    where: { id: user.id },
    data: { lastActiveAt: new Date() }
  });

  // Generate tokens
  const tokens = generateTokens(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      currentLevel: user.currentLevel,
      totalXP: user.totalXP,
    },
    ...tokens,
  };
};

export const refreshToken = async (data: RefreshTokenData) => {
  const { refreshToken } = data;

  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET || 'secret'
    ) as { userId: string };

    const tokens = generateTokens(decoded.userId);
    return tokens;
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
};

export const logout = async (data: LogoutData) => {
  // In a production app, you'd want to blacklist the token
  // For now, client-side token removal is sufficient
  return { success: true };
};
