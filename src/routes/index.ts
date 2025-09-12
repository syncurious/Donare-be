import { Router } from 'express';
import { router as usersRouter } from './users.routes.js';
import { router as authRouter } from './auth.routes.js';

export const router = Router();

router.use('/users', usersRouter);
router.use('/user', usersRouter); // backwards-compatible alias
router.use('/auth', authRouter);


