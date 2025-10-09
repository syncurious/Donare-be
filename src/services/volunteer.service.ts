import type { Request } from "express";
import { VolunteersModel, AvailabilityStatus } from "../models/Volunteers";
import type { functionReturnObjectType } from "../types/index";

export const register = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return { error: { status: 400, message: "User id missing" } };
  }

  const {
    full_name,
    phone,
    email,
    on_week_days,
    on_week_ends,
    skills,
    message,
  } = req.body || {};

  const missing: string[] = [];
  if (!full_name) missing.push("full_name");
  if (!phone) missing.push("phone");
  if (!email) missing.push("email");
  if (!on_week_days) missing.push("on_week_days");
  if (!on_week_ends) missing.push("on_week_ends");
  if (!skills) missing.push("skills");
  if (!message) missing.push("message");
  if (missing.length) {
    return { error: { status: 400, message: `Missing fields: ${missing.join(", ")}` } };
  }

  if (!Object.values(AvailabilityStatus).includes(on_week_days)) {
    return { error: { status: 400, message: "Invalid on_week_days value" } };
  }
  if (!Object.values(AvailabilityStatus).includes(on_week_ends)) {
    return { error: { status: 400, message: "Invalid on_week_ends value" } };
  }

  const exists = await VolunteersModel.findOne({ user_id: id }).lean();
  if (exists) {
    return { error: { status: 409, message: "Volunteer profile already exists" } };
  }

  const volunteer = await VolunteersModel.create({
    user_id: id,
    full_name,
    phone,
    email,
    on_week_days,
    on_week_ends,
    skills,
    message,
  });

  return {
    success: {
      data: {
        volunteer: {
          id: volunteer._id?.toString(),
          full_name: volunteer.full_name,
          phone: volunteer.phone,
          email: volunteer.email,
          on_week_days: volunteer.on_week_days,
          on_week_ends: volunteer.on_week_ends,
          skills: volunteer.skills,
          message: volunteer.message,
          status: volunteer.status,
          created_at: volunteer.created_at,
        },
      },
      message: "Volunteer registered successfully",
      status: 201,
    },
  };
};

export const get = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return { error: { status: 400, message: "User id missing" } };
  }

  const volunteer = await VolunteersModel.findOne({ user_id: id }).lean();
  if (!volunteer) {
    return { error: { status: 404, message: "Volunteer profile not found" } };
  }

  return {
    success: {
      data: {
        volunteer: {
          id: (volunteer as any)._id?.toString?.(),
          full_name: (volunteer as any).full_name,
          phone: (volunteer as any).phone,
          email: (volunteer as any).email,
          on_week_days: (volunteer as any).on_week_days,
          on_week_ends: (volunteer as any).on_week_ends,
          skills: (volunteer as any).skills,
          message: (volunteer as any).message,
          status: (volunteer as any).status,
          created_at: (volunteer as any).created_at,
          updated_at: (volunteer as any).updated_at,
        },
      },
      message: "Volunteer fetched successfully",
      status: 200,
    },
  };
};


