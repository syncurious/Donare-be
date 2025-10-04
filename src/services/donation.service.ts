import type { Request } from "express";
import { DonationsModel, DonationType, DonationStatus, PaymentStatus } from "../models/Donations.js";
import type { functionReturnObjectType } from "../types/index.js";

export const createZakat = async (req: Request): Promise<functionReturnObjectType> => {
  const { id } = (req as any).user || {};
  if (!id) {
    return {
      error: {
        status: 400,
        message: "User id missing",
      },
    };
  }

  const {
    donation_type,
    amount,
    description,
    zakat_year,
    zakat_calculation_method,
    zakat_assets_value,
    zakat_percentage,
    payment_method,
    is_in_kind,
    // In-kind specific fields
    item_name,
    item_image,
    donor_name,
    donor_phone,
    pickup_address,
  } = req.body || {};

  // Validate required fields
  if (!donation_type || donation_type !== 'ZAKAT') {
    return {
      error: {
        status: 400,
        message: "Donation type must be ZAKAT",
      },
    };
  }

  if (!zakat_year || !zakat_calculation_method || !zakat_assets_value) {
    return {
      error: {
        status: 400,
        message: "zakat_year, zakat_calculation_method, and zakat_assets_value are required",
      },
    };
  }

  // Validate in-kind vs in-amount
  if (is_in_kind) {
    // For in-kind donations, validate required fields
    const missingFields = [];
    if (!item_name) missingFields.push('item_name');
    if (!donor_name) missingFields.push('donor_name');
    if (!donor_phone) missingFields.push('donor_phone');
    if (!pickup_address) missingFields.push('pickup_address');
    
    if (missingFields.length > 0) {
      return {
        error: {
          status: 400,
          message: `For in-kind donations, the following fields are required: ${missingFields.join(', ')}`,
        },
      };
    }
    
    // For in-kind, amount and payment_method should not be provided
    if (amount !== undefined) {
      return {
        error: {
          status: 400,
          message: "Amount should not be provided for in-kind donations",
        },
      };
    }
    if (payment_method !== undefined) {
      return {
        error: {
          status: 400,
          message: "Payment method should not be provided for in-kind donations",
        },
      };
    }
  } else {
    // For amount donations, validate required fields
    const missingFields = [];
    if (!amount) missingFields.push('amount');
    if (!payment_method) missingFields.push('payment_method');
    
    if (missingFields.length > 0) {
      return {
        error: {
          status: 400,
          message: `For amount donations, the following fields are required: ${missingFields.join(', ')}`,
        },
      };
    }
    
    // For amount donations, in-kind specific fields should not be provided
    const invalidFields = [];
    if (item_name !== undefined) invalidFields.push('item_name');
    if (item_image !== undefined) invalidFields.push('item_image');
    if (donor_name !== undefined) invalidFields.push('donor_name');
    if (donor_phone !== undefined) invalidFields.push('donor_phone');
    if (pickup_address !== undefined) invalidFields.push('pickup_address');
    
    if (invalidFields.length > 0) {
      return {
        error: {
          status: 400,
          message: `For amount donations, the following fields should not be provided: ${invalidFields.join(', ')}`,
        },
      };
    }
  }

  try {
    const donation = await DonationsModel.create({
      user_id: id,
      donation_type: DonationType.ZAKAT,
      amount: is_in_kind ? undefined : amount,
      description,
      is_in_kind: !!is_in_kind,
      item_name: is_in_kind ? item_name : undefined,
      item_image: is_in_kind ? item_image : undefined,
      donor_name: is_in_kind ? donor_name : undefined,
      donor_phone: is_in_kind ? donor_phone : undefined,
      pickup_address: is_in_kind ? pickup_address : undefined,
      zakat_year,
      zakat_calculation_method,
      zakat_assets_value,
      zakat_percentage: zakat_percentage || 2.5,
      payment_method: is_in_kind ? undefined : payment_method,
      payment_status: is_in_kind ? PaymentStatus.PENDING : PaymentStatus.COMPLETED,
      status: DonationStatus.PENDING,
    });

    return {
      success: {
        data: {
          donation: {
            id: donation._id?.toString(),
            donation_type: donation.donation_type,
            amount: donation.amount,
            description: donation.description,
            is_in_kind: donation.is_in_kind,
            item_name: donation.item_name,
            item_image: donation.item_image,
            donor_name: donation.donor_name,
            donor_phone: donation.donor_phone,
            pickup_address: donation.pickup_address,
            zakat_year: donation.zakat_year,
            zakat_calculation_method: donation.zakat_calculation_method,
            zakat_assets_value: donation.zakat_assets_value,
            zakat_percentage: donation.zakat_percentage,
            payment_method: donation.payment_method,
            payment_status: donation.payment_status,
            status: donation.status,
            created_at: donation.created_at,
          },
        },
        message: "Zakat donation created successfully",
        status: 201,
      },
    };
  } catch (error) {
    console.error("Error creating zakat donation:", error);
    return {
      error: {
        status: 500,
        message: "Failed to create zakat donation",
      },
    };
  }
};
