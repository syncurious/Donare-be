import { Router } from "express";
import * as DonationController from "../controllers/donation.controller";
import { authMiddleware } from "../middlewares/auth";

export const router = Router();

router.post("/", authMiddleware, DonationController.createDonation);
router.post("/zakat", authMiddleware, DonationController.createZakat);
router.post("/fitrah", authMiddleware, DonationController.createFitrah);
router.post("/sadaqah", authMiddleware, DonationController.createSadaqah);
router.post("/other", authMiddleware, DonationController.createOther);

router.get("/", authMiddleware, DonationController.getDonations);
router.get("/:id", authMiddleware, DonationController.getDonationById);
