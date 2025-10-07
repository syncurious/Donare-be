import { Router } from "express";
import * as HelpRequestController from "../controllers/helpRequest.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router();

router.post("/", authMiddleware, HelpRequestController.create);
router.get("/", authMiddleware, HelpRequestController.getAll);


