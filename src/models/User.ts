import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  full_name: string;
  city: string;
  password_hash?: string;
  last_zakat_date?: Date;
  zakat_reminders_enabled: boolean;
  campaign_updates_enabled: boolean;
  created_at: Date;
  updated_at: Date;
  supabase_user_id?: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    full_name: { type: String, required: true },
    city: { type: String, required: true },
    password_hash: { type: String },
    last_zakat_date: { type: Date },
    zakat_reminders_enabled: { type: Boolean, default: false },
    campaign_updates_enabled: { type: Boolean, default: false },
    supabase_user_id: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const UserModel = model<UserDocument>('User', UserSchema);


