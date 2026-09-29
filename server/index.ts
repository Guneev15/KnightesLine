import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import trialRoutes from './routes/trialRoutes';

const app = express();

// Middleware
app.use(
  cors({
    origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    platform: 'KNIGHTESLINE ACADEMY API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/trials', trialRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Start Server
const server = app.listen(config.port, () => {
  console.log(`\n======================================================`);
  console.log(` ♞ KNIGHTESLINE CHESS ACADEMY - BACKEND SERVER`);
  console.log(`======================================================`);
  console.log(` ✓ Status: Listening on http://localhost:${config.port}`);
  console.log(` ✓ Health: http://localhost:${config.port}/api/health`);
  console.log(` ✓ Auth:   http://localhost:${config.port}/api/auth/login`);
  console.log(` ✓ Payments: http://localhost:${config.port}/api/payments/create-order`);
  console.log(` ✓ Client: ${config.clientUrl}`);
  console.log(`======================================================\n`);
});

export default app;
