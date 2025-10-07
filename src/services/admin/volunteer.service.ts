import type { Request } from "express";
import { VolunteersModel, Status } from "../../models/Volunteers.js";
import type { functionReturnObjectType } from "../../types/index.js";

export const list = async (req: Request): Promise<functionReturnObjectType> => {
  const { status } = req.query as { status?: string };

  const filter: any = {};
  if (status) {
    const upper = status.toString().toUpperCase();
    if (!Object.values(Status).includes(upper as Status)) {
      return { error: { status: 400, message: "Invalid status" } };
    }
    filter.status = upper;
  }

  const list = await VolunteersModel.find(filter).sort({ created_at: -1 }).lean();

  return {
    success: {
      data: {
        volunteers: list.map((v: any) => ({
          id: v._id?.toString?.(),
          user_id: v.user_id,
          full_name: v.full_name,
          phone: v.phone,
          email: v.email,
          on_week_days: v.on_week_days,
          on_week_ends: v.on_week_ends,
          skills: v.skills,
          message: v.message,
          status: v.status,
          created_at: v.created_at,
          updated_at: v.updated_at,
        })),
        total: list.length,
      },
      message: "Volunteers fetched successfully",
      status: 200,
    },
  };
};


