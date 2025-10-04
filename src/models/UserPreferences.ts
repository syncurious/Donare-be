import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface UserPreferencesDocument extends Document {
  user_id: string;
  last_zakat_date: Date;
  receive_zakat_remainder: boolean;
  stay_updated_on_new_campaigns: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserPreferencesSchema = new Schema<UserPreferencesDocument>(
  {
    user_id: { type: String, required: true, unique: true, index: true },
    last_zakat_date: { type: Date, required: true },
    receive_zakat_remainder: { type: Boolean, required: true },
    stay_updated_on_new_campaigns: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const UserPreferencesModel = model<UserPreferencesDocument>('UserPreferences', UserPreferencesSchema);
