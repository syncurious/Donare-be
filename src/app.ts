import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as routers } from './routes/index';
import morgan from 'morgan';


export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', routers);

  return app;
}


