import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router();

router.get("/profile", authMiddleware, UserController.getProfile);
router.get("/preferences", authMiddleware,UserController.getPreferences);


