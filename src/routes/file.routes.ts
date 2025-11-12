import { Router } from "express";
import { upload as uploadController } from "../controllers/file.controller";
import { testNotification } from "../controllers/notification.controller";
import aws from "../middlewares/aws";

export const router = Router();

router.post("/upload", aws.uploadbuffer.single("image"), uploadController);
router.post("/notification/test", testNotification);

