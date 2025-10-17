import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import challengeRoutes from './routes/challenges';
import userRoutes from './routes/users';
import attemptRoutes from './routes/attempts';
import solutionRoutes from './routes/solutions';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/requestLogger';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/solutions', solutionRoutes);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle code execution requests
  socket.on('execute-code', async (data) => {
    try {
      // Emit execution started
      socket.emit('execution-started', { requestId: data.requestId });

      // Execution logic will be handled by the sandbox service
      // For now, acknowledge receipt
      socket.emit('execution-queued', { requestId: data.requestId });
    } catch (error) {
      socket.emit('execution-error', {
        requestId: data.requestId,
        error: 'Execution failed'
      });
    }
  });

  // Handle AI agent requests
  socket.on('request-hint', async (data) => {
    try {
      socket.emit('hint-processing', { requestId: data.requestId });
      // Agent service integration will be added
    } catch (error) {
      socket.emit('hint-error', {
        requestId: data.requestId,
        error: 'Failed to get hint'
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };
