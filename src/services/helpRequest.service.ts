import type { Request } from "express";
import { HelpRequestsModel, Status } from "../models/HelpRequests";
import type { functionReturnObjectType } from "../types/index";

export const create = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) return { error: { status: 400, message: "User id missing" } };

  const {
    full_name,
    phone,
    address,
    city,
    zip_code,
    country,
    description,
    image,
  } = req.body || {};

  const missing: string[] = [];
  if (!full_name) missing.push("full_name");
  if (!description) missing.push("description");
  if (missing.length) return { error: { status: 400, message: `Missing fields: ${missing.join(", ")}` } };

  // Ensure there is no existing pending help request for this user
  const pending = await HelpRequestsModel.findOne({ user_id: id, status: Status.PENDING }).lean();
  if (pending) {
    return {
      error: {
        status: 409,
        message: "A pending help request already exists",
      },
    };
  }

  
  const help = await HelpRequestsModel.create({
    user_id: id,
    full_name,
    phone,
    address,
    city,
    zip_code,
    country,
    description,
    image,
  });

  return {
    success: {
      data: {
        help_request: {
          id: help._id?.toString(),
          status: help.status,
          full_name: help.full_name,
          phone: help.phone,
          address: help.address,
          city: help.city,
          zip_code: help.zip_code,
          country: help.country,
          description: help.description,
          image: help.image,
          created_at: help.created_at,
        },
      },
      message: "Help request created successfully",
      status: 201,
    },
  };
};

export const getAll = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) return { error: { status: 400, message: "User id missing" } };

  const list = await HelpRequestsModel.find({ user_id: id }).sort({ created_at: -1 }).lean();

  return {
    success: {
      data: {
        help_requests: list.map((h: any) => ({
          id: h._id?.toString?.(),
          status: h.status,
          full_name: h.full_name,
          phone: h.phone,
          address: h.address,
          city: h.city,
          zip_code: h.zip_code,
          country: h.country,
          description: h.description,
          image: h.image,
          created_at: h.created_at,
          updated_at: h.updated_at,
        })),
        total: list.length,
      },
      message: "Help requests fetched successfully",
      status: 200,
    },
  };
};


