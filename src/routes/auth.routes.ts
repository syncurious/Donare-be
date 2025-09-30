import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';

export const router = Router();

router.post('/signup', AuthController.signup);


