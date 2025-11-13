import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.login);
router.post('/logout', authMiddleware , AuthController.logout);




