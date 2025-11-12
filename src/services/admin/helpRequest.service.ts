import type { Request } from "express";
import { HelpRequestsModel, Status } from "../../models/HelpRequests";
import type { functionReturnObjectType } from "../../types/index";
import { UserModel } from "../../models/User";
import { sendNotification } from "../notification.service";

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

  const list = await HelpRequestsModel.find(filter).sort({ created_at: -1 }).lean();

  return {
    success: {
      data: {
        help_requests: list.map((h: any) => ({
          id: h._id?.toString?.(),
          user_id: h.user_id,
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

export const updateStatus = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = req.params as { id: string };
  const { status } = req.body as { status?: string };

  if (!id) return { error: { status: 400, message: "id is required" } };
  if (!status) return { error: { status: 400, message: "status is required" } };

  const upper = status.toString().toUpperCase();
  if (!Object.values(Status).includes(upper as Status)) {
    return { error: { status: 400, message: "Invalid status" } };
  }

  const updated = await HelpRequestsModel.findByIdAndUpdate(
    id,
    { $set: { status: upper } },
    { new: true }
  ).populate({
    path: "user_id",
    model: UserModel,
    select: "device_id full_name phone email profile_picture"
  }).lean();

  if (!updated) return { error: { status: 404, message: "Help request not found" } };

  const tokens = (updated as any).user_id?.device_id;
  const notificationPayload = {
    title: "Help Request Update",
    body: "",
  }
  if (tokens) {
    if (status === Status.APPROVED) {
      notificationPayload.body = `${updated?.full_name} you'er help Request has been approved. our Team will contact you soon.`;
    } else if (status === Status.REJECTED) {
      notificationPayload.body = `${updated?.full_name} we're sorry to inform you that your help Request has been rejected.`;
    }
    let result = await sendNotification({
      tokens: tokens,
      title: notificationPayload.title,
      body: notificationPayload.body,
    });
  }

  return {
    success: {
      data: {
        help_request: {
          id: (updated as any)._id?.toString?.(),
          user_id: (updated as any).user_id,
          status: (updated as any).status,
          full_name: (updated as any).full_name,
          phone: (updated as any).phone,
          address: (updated as any).address,
          city: (updated as any).city,
          zip_code: (updated as any).zip_code,
          country: (updated as any).country,
          description: (updated as any).description,
          image: (updated as any).image,
          created_at: (updated as any).created_at,
          updated_at: (updated as any).updated_at,
        },
      },
      message: "Help request status updated successfully",
      status: 200,
    },
  };
};


