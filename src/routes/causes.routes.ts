import { Router } from "express";
import * as CausesController from "../controllers/causes.controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post("/", authMiddleware, CausesController.create);
router.get("/", authMiddleware, CausesController.getAll);


