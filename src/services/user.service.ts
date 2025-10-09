import type { Request } from "express";
import { UserModel } from "../models/User";
import type { functionReturnObjectType } from "../types/index";

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

export const updateProfile = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return {
      error: { status: 400, message: "User id missing" },
    };
  }

  const { email, full_name, phone, profile_picture } = req.body || {};

  const update: any = {};
  if (email !== undefined) update.email = email;
  if (full_name !== undefined) update.full_name = full_name;
  if (phone !== undefined) update.phone = phone;
  if (profile_picture !== undefined) update.profilePicture = profile_picture;

  const user = await UserModel.findByIdAndUpdate(id, { $set: update }, { new: true })
    .select("-password_hash")
    .lean();

  if (!user) {
    return { error: { status: 404, message: "User not found" } };
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
      message: "Profile updated successfully",
      status: 200,
    },
  };
};

export const updatePreferences = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return {
      error: { status: 400, message: "User id missing" },
    };
  }

  const {
    last_zakat_date,
    receive_zakat_remainder,
    stay_updated_on_new_campaigns,
  } = req.body || {};

  const update: any = {};
  if (last_zakat_date !== undefined) update.last_zakat_date = new Date(last_zakat_date);
  if (receive_zakat_remainder !== undefined) update.zakat_reminders_enabled = !!receive_zakat_remainder;
  if (stay_updated_on_new_campaigns !== undefined) update.campaign_updates_enabled = !!stay_updated_on_new_campaigns;

  const user = await UserModel.findByIdAndUpdate(id, { $set: update }, { new: true })
    .select("last_zakat_date zakat_reminders_enabled campaign_updates_enabled")
    .lean();

  if (!user) {
    return { error: { status: 404, message: "User not found" } };
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
      message: "Preferences updated successfully",
      status: 200,
    },
  };
};


