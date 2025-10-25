import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.get("/profile", authMiddleware, UserController.getProfile);
router.get("/preferences", authMiddleware, UserController.getPreferences);
router.patch("/profile", authMiddleware, UserController.updateProfile);
router.patch("/preferences", authMiddleware, UserController.updatePreferences);


