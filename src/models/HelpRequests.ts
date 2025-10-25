import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface HelpRequestsDocument extends Document {
  user_id: string;
  status: Status;
  message: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  description?: string;
  image?: string;
  created_at: Date;
  updated_at: Date;
}

const HelpRequestsSchema = new Schema<HelpRequestsDocument>(
  {
    user_id: { type: String, required: true, index: true },
    status: { 
      type: String, 
      enum: Object.values(Status), 
      default: Status.PENDING 
    },
    full_name: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    zip_code: { type: String },
    country: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const HelpRequestsModel = model<HelpRequestsDocument>('HelpRequests', HelpRequestsSchema);


