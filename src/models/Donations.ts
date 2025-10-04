import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export enum DonationType {
  ZAKAT = 'ZAKAT',
  SADAQAH = 'SADAQAH',
  FITRAH = 'FITRAH',
  CAMPAIGN = 'CAMPAIGN',
  OTHER = 'OTHER'
}

export enum DonationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface DonationsDocument extends Document {
  user_id: string;
  amount?: number;
  donation_type: DonationType;
  description?: string;
  
  // Donation in kind fields
  is_in_kind: boolean;
  item_name?: string;
  item_image?: string;
  donor_name?: string;
  donor_phone?: string;
  pickup_address?: string;
  
  // Zakat specific fields
  zakat_year?: number;
  zakat_calculation_method?: string; // "GOLD", "SILVER", "CASH", "INVESTMENTS", etc.
  zakat_assets_value?: number;
  
  // Fitrah specific fields
  fitrah_year?: number;
  fitrah_calculation_method?: string; // "DATES", "WHEAT", "BARLEY", "RAISINS", "CASH"
  fitrah_amount?: number;
  
  // Transaction details
  transaction_id?: string;
  payment_method?: string;
  payment_status: PaymentStatus;
  status: DonationStatus;
  
  created_at: Date;
  updated_at: Date;
}

const DonationsSchema = new Schema<DonationsDocument>(
  {
    user_id: { type: String, required: true, index: true },
    amount: { type: Number },
    donation_type: { 
      type: String, 
      enum: Object.values(DonationType), 
      required: true 
    },
    description: { type: String },
    
    // Donation in kind fields
    is_in_kind: { type: Boolean, default: false },
    item_name: { type: String },
    item_image: { type: String },
    donor_name: { type: String },
    donor_phone: { type: String },
    pickup_address: { type: String },
    
    // Zakat specific fields
    zakat_year: { type: Number },
    zakat_calculation_method: { type: String },
    zakat_assets_value: { type: Number },
    
    // Fitrah specific fields
    fitrah_year: { type: Number },
    fitrah_calculation_method: { type: String },
    fitrah_amount: { type: Number },
    
    // Transaction details
    transaction_id: { type: String },
    payment_method: { type: String },
    payment_status: { 
      type: String, 
      enum: Object.values(PaymentStatus), 
      default: PaymentStatus.COMPLETED 
    },
    status: { 
      type: String, 
      enum: Object.values(DonationStatus), 
      default: DonationStatus.COMPLETED 
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const DonationsModel = model<DonationsDocument>('Donations', DonationsSchema);
