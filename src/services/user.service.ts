import { UserModel } from '../models/User.js';
import type { UserDocument } from '../models/User.js';

export interface CreateUserDto {
  email: string;
  full_name: string;
  city: string;
  last_zakat_date?: string | Date;
  zakat_reminders_enabled?: boolean;
  campaign_updates_enabled?: boolean;
  supabase_user_id?: string;
}

export interface UpdateUserDto {
  full_name?: string;
  city?: string;
  last_zakat_date?: string | Date;
  zakat_reminders_enabled?: boolean;
  campaign_updates_enabled?: boolean;
}

export class UserService {
  async create(payload: CreateUserDto): Promise<UserDocument> {
    const existing = await UserModel.findOne({ email: payload.email }).lean();
    if (existing) {
      const error: any = new Error('User with this email already exists');
      error.status = 409;
      throw error;
    }

    const user = await UserModel.create({
      email: payload.email,
      full_name: payload.full_name,
      city: payload.city,
      last_zakat_date: payload.last_zakat_date ? new Date(payload.last_zakat_date) : undefined,
      zakat_reminders_enabled: payload.zakat_reminders_enabled ?? false,
      campaign_updates_enabled: payload.campaign_updates_enabled ?? false,
      supabase_user_id: payload.supabase_user_id,
    });
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return UserModel.find().sort({ created_at: -1 }).lean();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await UserModel.findById(id).lean();
    if (!user) {
      const error: any = new Error(`User with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    return user as unknown as UserDocument;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).lean();
  }

  async findBySupabaseUserId(supabaseUserId: string): Promise<UserDocument | null> {
    return UserModel.findOne({ supabase_user_id: supabaseUserId }).lean();
  }

  async update(id: string, payload: UpdateUserDto): Promise<UserDocument> {
    const update: any = { ...payload };
    if (payload.last_zakat_date) {
      update.last_zakat_date = new Date(payload.last_zakat_date);
    }
    const user = await UserModel.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!user) {
      const error: any = new Error(`User with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    return user as unknown as UserDocument;
  }

  async remove(id: string): Promise<void> {
    const res = await UserModel.findByIdAndDelete(id);
    if (!res) {
      const error: any = new Error(`User with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  async updatePreferences(id: string, preferences: { zakat_reminders_enabled?: boolean; campaign_updates_enabled?: boolean }): Promise<UserDocument> {
    return this.update(id, preferences);
  }
}


