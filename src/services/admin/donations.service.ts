import type { Request } from "express";
import { DonationsModel, DonationType } from "../../models/Donations";
import type { functionReturnObjectType } from "../../types/index";

export const list = async (req: Request): Promise<functionReturnObjectType> => {
  const { type } = req.query as { type?: string };

  const filter: any = {};
  if (type) {
    const upper = type.toString().toUpperCase();
    if (!Object.values(DonationType).includes(upper as DonationType)) {
      return { error: { status: 400, message: "Invalid donation type" } };
    }
    filter.donation_type = upper;
  }

  const list = await DonationsModel.find(filter).sort({ created_at: -1 }).lean();

  return {
    success: {
      data: {
        donations: list.map((d: any) => ({
          id: d._id?.toString?.(),
          user_id: d.user_id,
          donation_type: d.donation_type,
          amount: d.amount,
          description: d.description,
          is_in_kind: d.is_in_kind,
          item_name: d.item_name,
          item_image: d.item_image,
          donor_name: d.donor_name,
          donor_phone: d.donor_phone,
          pickup_address: d.pickup_address,
          zakat_year: d.zakat_year,
          zakat_calculation_method: d.zakat_calculation_method,
          zakat_assets_value: d.zakat_assets_value,
          zakat_percentage: d.zakat_percentage,
          fitrah_year: d.fitrah_year,
          fitrah_calculation_method: d.fitrah_calculation_method,
          fitrah_amount: d.fitrah_amount,
          transaction_id: d.transaction_id,
          payment_method: d.payment_method,
          payment_status: d.payment_status,
          status: d.status,
          created_at: d.created_at,
          updated_at: d.updated_at,
        })),
        total: list.length,
      },
      message: "Donations fetched successfully",
      status: 200,
    },
  };
};

export const getById = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = req.params as { id: string };
  if (!id) return { error: { status: 400, message: "id is required" } };

  const d: any = await DonationsModel.findById(id).lean();
  if (!d) return { error: { status: 404, message: "Donation not found" } };

  return {
    success: {
      data: {
        donation: {
          id: d._id?.toString?.(),
          user_id: d.user_id,
          donation_type: d.donation_type,
          amount: d.amount,
          description: d.description,
          is_in_kind: d.is_in_kind,
          item_name: d.item_name,
          item_image: d.item_image,
          donor_name: d.donor_name,
          donor_phone: d.donor_phone,
          pickup_address: d.pickup_address,
          zakat_year: d.zakat_year,
          zakat_calculation_method: d.zakat_calculation_method,
          zakat_assets_value: d.zakat_assets_value,
          zakat_percentage: d.zakat_percentage,
          fitrah_year: d.fitrah_year,
          fitrah_calculation_method: d.fitrah_calculation_method,
          fitrah_amount: d.fitrah_amount,
          transaction_id: d.transaction_id,
          payment_method: d.payment_method,
          payment_status: d.payment_status,
          status: d.status,
          created_at: d.created_at,
          updated_at: d.updated_at,
        },
      },
      message: "Donation fetched successfully",
      status: 200,
    },
  };
};


