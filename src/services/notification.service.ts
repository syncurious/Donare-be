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

const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

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

    const batches = chunkArray(tokens, 500);
    let successCount = 0;
    let failureCount = 0;
    const responses: any[] = [];

    for (const batch of batches) {
      const resp = await messaging.sendEachForMulticast({
        tokens: batch,
        notification: {
          title: params.title,
          body: params.body,
        },
        data: params.data,
      });
      successCount += resp.successCount;
      failureCount += resp.failureCount;
      responses.push(...resp.responses);
    }

    return {
      success: {
        status: 200,
        message: "Notifications sent",
        data: {
          success_count: successCount,
          failure_count: failureCount,
          responses,
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

