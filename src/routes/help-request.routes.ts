import { Router } from "express";
import * as HelpRequestController from "../controllers/helpRequest.controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post("/", authMiddleware, HelpRequestController.create);
router.get("/", authMiddleware, HelpRequestController.getAll);


