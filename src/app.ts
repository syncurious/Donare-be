import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router as apiRouter } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use('/api', apiRouter);

  app.use(errorHandler);

  return app;
}


