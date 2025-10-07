import { Router } from "express";
import * as AdminVolunteerController from "../controllers/admin/volunteer.controller";
import { authMiddleware } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

export const router = Router();

router.get(
  "/volunteer",
  authMiddleware,
  authorize("admin"),
  AdminVolunteerController.list
);


