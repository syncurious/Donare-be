import { Router } from "express";
import { router as AuthRouter } from "./auth.routes";
export const router = Router();

router.use("/auth", AuthRouter);
