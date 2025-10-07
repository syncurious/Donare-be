import { Router } from "express";
import * as AdminVolunteerController from "../controllers/admin/volunteer.controller";
import * as AdminHelpRequestController from "../controllers/admin/helpRequest.controller";
import * as AdminDonationsController from "../controllers/admin/donations.controller";
import { authMiddleware } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

export const router = Router();

router.get(
  "/volunteer",
  authMiddleware,
  authorize("admin"),
  AdminVolunteerController.list
);

router.patch(
  "/volunteer/:id",
  authMiddleware,
  authorize("admin"),
  AdminVolunteerController.updateStatus
);

router.get(
  "/help-request",
  authMiddleware,
  authorize("admin"),
  AdminHelpRequestController.list
);

router.patch(
  "/help-request/:id",
  authMiddleware,
  authorize("admin"),
  AdminHelpRequestController.updateStatus
);

router.get(
  "/donations",
  authMiddleware,
  authorize("admin"),
  AdminDonationsController.list
);

router.get(
  "/donations/:id",
  authMiddleware,
  authorize("admin"),
  AdminDonationsController.getById
);


