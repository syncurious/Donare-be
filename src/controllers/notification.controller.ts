import response from "../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index";
import { sendNotification } from "../services/notification.service";

export const testNotification = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await sendNotification({
      tokens: req.body.token,
      title: req.body.title || "Test Notification",
      body: req.body.body || "This is a test notification",
    });
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

