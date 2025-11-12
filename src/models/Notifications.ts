import { Schema, model, Types } from "mongoose";
import type { Document } from "mongoose";

export interface NotificationUserInfo {
  id: Types.ObjectId;
  profile?: string;
  username?: string;
}

export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export interface NotificationDocument extends Document {
  receiver?: NotificationUserInfo;
  sender?: NotificationUserInfo;
  multi_receivers?: NotificationUserInfo[];
  notification: NotificationPayload;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserInfoSchema = new Schema<NotificationUserInfo>(
  {
    id: { type: Schema.Types.ObjectId, ref: "User" },
    profile: { type: String },
    username: { type: String },
  },
  { _id: false }
);

const NotificationSchema = new Schema<NotificationDocument>(
  {
    receiver: { type: UserInfoSchema },
    sender: { type: UserInfoSchema },
    multi_receivers: { type: [UserInfoSchema], default: [] },
    notification: {
      title: { type: String, required: true },
      body: { type: String, required: true },
      data: { type: Schema.Types.Mixed },
    },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const NotificationsModel = model<NotificationDocument>(
  "Notifications",
  NotificationSchema
);


