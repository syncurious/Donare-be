import type { Request } from "express";
import { VolunteersModel, Status } from "../../models/Volunteers";
import type { functionReturnObjectType } from "../../types/index";

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

export const updateStatus = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = req.params as { id: string };
  const { status } = req.body as { status?: string };

  if (!id) {
    return { error: { status: 400, message: "id is required" } };
  }
  if (!status) {
    return { error: { status: 400, message: "status is required" } };
  }

  const upper = status.toString().toUpperCase();
  if (!Object.values(Status).includes(upper as Status)) {
    return { error: { status: 400, message: "Invalid status" } };
  }

  const updated = await VolunteersModel.findByIdAndUpdate(
    id,
    { $set: { status: upper } },
    { new: true }
  ).lean();

  if (!updated) {
    return { error: { status: 404, message: "Volunteer not found" } };
  }

  return {
    success: {
      data: {
        volunteer: {
          id: (updated as any)._id?.toString?.(),
          user_id: (updated as any).user_id,
          full_name: (updated as any).full_name,
          phone: (updated as any).phone,
          email: (updated as any).email,
          on_week_days: (updated as any).on_week_days,
          on_week_ends: (updated as any).on_week_ends,
          skills: (updated as any).skills,
          message: (updated as any).message,
          status: (updated as any).status,
          created_at: (updated as any).created_at,
          updated_at: (updated as any).updated_at,
        },
      },
      message: "Volunteer status updated successfully",
      status: 200,
    },
  };
};


