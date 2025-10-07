import { Router } from "express";
import { router as AuthRouter } from "./auth.routes";
import { router as DonationRouter } from "./donation.routes";
import { router as VolunteerRouter } from "./volunteer.routes";
import { router as UserRouter } from "./user.routes";
import { router as HelpRequestRouter } from "./help-request.routes";
import { router as CausesRouter } from "./causes.routes";
import { router as AdminRouter } from "./admin.routes";
export const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/donation", DonationRouter);
router.use("/volunteer", VolunteerRouter);
router.use("/help-request", HelpRequestRouter);
router.use("/causes", CausesRouter);
router.use("/admin", AdminRouter);
