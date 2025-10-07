import type { Request } from "express";
import { CausesModel, MediaType } from "../models/Causes.js";
import type { functionReturnObjectType } from "../types/index.js";

export const create = async (
  req: Request
): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) return { error: { status: 400, message: "User id missing" } };

  const { name, description, media, media_type } = req.body || {};
  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!description) missing.push("description");
  if (!media_type) missing.push("media_type");
  if (missing.length)
    return {
      error: { status: 400, message: `Missing fields: ${missing.join(", ")}` },
    };

  if (!Object.values(MediaType).includes(media_type)) {
    return { error: { status: 400, message: "Invalid media_type" } };
  }

  const cause = await CausesModel.create({
    user_id: id,
    name,
    description,
    media,
    media_type,
  });

  return {
    success: {
      data: {
        id: cause._id?.toString(),
        name: cause.name,
        description: cause.description,
        media: cause.media,
        media_type: cause.media_type,
        status: cause.status,
        created_at: cause.created_at,
      },
      message: "Cause created successfully",
      status: 201,
    },
  };
};

export const getAll = async (
  req: Request
): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) return { error: { status: 400, message: "User id missing" } };

  const list = await CausesModel.find({ user_id: id })
    .sort({ created_at: -1 })
    .lean();

  return {
    success: {
      data: {
        causes: list.map((c: any) => ({
          id: c._id?.toString?.(),
          name: c.name,
          description: c.description,
          media: c.media,
          media_type: c.media_type,
          status: c.status,
          created_at: c.created_at,
          updated_at: c.updated_at,
        })),
        total: list.length,
      },
      message: "Causes fetched successfully",
      status: 200,
    },
  };
};
