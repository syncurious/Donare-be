import { Router } from "express";
import { router as AuthRouter } from "./auth.routes";
import { router as DonationRouter } from "./donation.routes";
export const router = Router();

router.use("/auth", AuthRouter);
router.use("/donation", DonationRouter);
