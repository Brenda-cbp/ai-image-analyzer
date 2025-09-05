import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import analyzeRouter from './routes/analyze.route';
import { errorHandler } from './middlewares/error.middleware';

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', analyzeRouter);

  app.use(errorHandler);
  return app;
};
