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
          email: user.email,
          fullName: user.full_name,
          phone: (user as any).phone ?? "",
          profilePicture: (user as any).profilePicture ?? "",
        },
      },
      message: "Profile fetched successfully",
      status: 200,
    },
  };
};

export const getPreferences = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return {
      error: {
        status: 400,
        message: "User id missing",
      },
    };
  }

  const user = await UserModel.findById(id)
    .select("zakat_reminders_enabled campaign_updates_enabled last_zakat_date")
    .lean();
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
        preferences: {
          last_zakat_date: user.last_zakat_date ?? null,
          zakat_reminders_enabled: user.zakat_reminders_enabled,
          campaign_updates_enabled: user.campaign_updates_enabled,
        },
      },
      message: "Preferences fetched successfully",
      status: 200,
    },
  };
};


