import { Router } from "express";
import * as VolunteerController from "../controllers/volunteer.controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post("/register", authMiddleware, VolunteerController.register);


