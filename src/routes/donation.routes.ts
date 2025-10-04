import { Router } from "express";
import * as DonationController from "../controllers/donation.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

export const router = Router();

router.post("/zakat", authMiddleware, DonationController.createZakat);
router.post("/fitrah", authMiddleware, DonationController.createFitrah);
router.post("/sadaqah", authMiddleware, DonationController.createSadaqah);
