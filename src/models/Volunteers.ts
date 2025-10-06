import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum AvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export interface VolunteersDocument extends Document {
  user_id: string;
  status: Status;
  full_name: string;
  phone: string;
  email: string;
  skills: string;
  on_week_days: AvailabilityStatus;
  on_week_ends: AvailabilityStatus;
  message: string;
  created_at: Date;
  updated_at: Date;
}

const VolunteersSchema = new Schema<VolunteersDocument>(
  {
    user_id: { type: String, required: true, unique: true, index: true },
    status: { 
      type: String, 
      enum: Object.values(Status), 
      default: Status.PENDING 
    },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    skills: { type: String, required: true },
    on_week_days: { 
      type: String, 
      enum: Object.values(AvailabilityStatus), 
      required: true 
    },
    on_week_ends: { 
      type: String, 
      enum: Object.values(AvailabilityStatus), 
      required: true 
    },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const VolunteersModel = model<VolunteersDocument>('Volunteers', VolunteersSchema);
