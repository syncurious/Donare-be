import type { Request } from "express";
import { UserModel } from "../models/User.js";
import type { functionReturnObjectType } from "../types/index.js";

export const getProfile = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return {
      error: {
        status: 400,
        message: "User id missing",
      },
    };
  }

  const user = await UserModel.findById(id).select("-password_hash").lean();
  if (!user) {
    return {
      error: {
        status: 404,
        message: "User not found",
      },
    };
  }

  return {
    success: {
      data: {
        user: {
          id: user._id?.toString?.() ?? (user as any).id,
          email: user.email,
          fullName: user.full_name,
          city: user.city,
          last_zakat_date: user.last_zakat_date,
          zakat_reminders_enabled: user.zakat_reminders_enabled,
          campaign_updates_enabled: user.campaign_updates_enabled,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      },
      message: "Profile fetched successfully",
      status: 200,
    },
  };
};


