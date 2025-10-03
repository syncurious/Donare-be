import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

export const router = Router();

router.get("/profile", UserController.getProfile);


