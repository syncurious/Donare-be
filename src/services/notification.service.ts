import type { Request } from "express";
import type { RequestUserToken, functionReturnObjectType } from "../types";
import {
  NotificationDocument,
  NotificationPayload,
  NotificationsModel,
  NotificationUserInfo,
} from "../models/Notifications";
import { getFirebaseMessaging } from "../config/firebase";

export interface SaveNotificationParams {
  receiver?: NotificationUserInfo;
  sender?: NotificationUserInfo;
  multi_receivers?: NotificationUserInfo[];
  notification: NotificationPayload;
}

export const saveNotification = async (
  payload: SaveNotificationParams
): Promise<functionReturnObjectType> => {
  try {
    const doc: NotificationDocument = await NotificationsModel.create({
      receiver: payload.receiver,
      sender: payload.sender,
      multi_receivers: payload.multi_receivers,
      notification: payload.notification,
    });

    return {
      success: {
        status: 201,
        message: "Notification saved successfully",
        data: { notification: doc },
      },
    };
  } catch (error) {
    return {
      error: {
        status: 500,
        message: "Failed to save notification",
        data: error,
      },
    };
  }
};

export interface SendNotificationParams {
  tokens: string | string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

export const sendNotification = async (
  params: SendNotificationParams
): Promise<functionReturnObjectType> => {
  try {
    const messaging = getFirebaseMessaging();
    if (!messaging) {
      return {
        error: {
          status: 500,
          message: "Firebase messaging is not configured",
        },
      };
    }

    const tokens =
      typeof params.tokens === "string" ? [params.tokens] : params.tokens;

    if (!tokens.length) {
      return {
        error: {
          status: 400,
          message: "At least one device token is required",
        },
      };
    }

    const response = await messaging.sendEachForMulticast({
      tokens,
      notification: {
        title: params.title,
        body: params.body,
      },
      data: params.data,
    });

    return {
      success: {
        status: 200,
        message: "Notifications sent",
        data: {
          success_count: response.successCount,
          failure_count: response.failureCount,
          responses: response.responses,
        },
      },
    };
  } catch (error) {
    return {
      error: {
        status: 500,
        message: "Failed to send notifications",
        data: error,
      },
    };
  }
};

