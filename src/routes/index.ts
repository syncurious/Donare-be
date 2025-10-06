import { Router } from "express";
import { router as AuthRouter } from "./auth.routes";
import { router as DonationRouter } from "./donation.routes";
import { router as UserRouter } from "./user.routes";
export const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/donation", DonationRouter);