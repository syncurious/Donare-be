import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface CausesDocument extends Document {
  user_id: string;
  name: string;
  description: string;
  media?: string;
  media_type: MediaType;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

const CausesSchema = new Schema<CausesDocument>(
  {
    user_id: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String },
    media_type: { 
      type: String, 
      enum: Object.values(MediaType), 
      required: true 
    },
    status: { 
      type: String, 
      enum: Object.values(Status), 
      default: Status.PENDING 
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const CausesModel = model<CausesDocument>('Causes', CausesSchema);
