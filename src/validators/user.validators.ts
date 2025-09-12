import type { CreateUserDto, UpdateUserDto } from '../services/user.service.js';

function isEmail(value: string): boolean {
  return /.+@.+\..+/.test(value);
}

export function validateCreateUser(payload: any): { value?: CreateUserDto; error?: string } {
  if (!payload || typeof payload !== 'object') return { error: 'Invalid payload' };
  const {
    email,
    full_name,
    city,
    last_zakat_date,
    zakat_reminders_enabled,
    campaign_updates_enabled,
    supabase_user_id,
  } = payload;

  if (!email || typeof email !== 'string' || !isEmail(email)) return { error: 'email is required and must be valid' };
  if (!full_name || typeof full_name !== 'string') return { error: 'full_name is required' };
  if (!city || typeof city !== 'string') return { error: 'city is required' };

  const dto: CreateUserDto = {
    email,
    full_name,
    city,
    last_zakat_date,
    zakat_reminders_enabled,
    campaign_updates_enabled,
    supabase_user_id,
  };
  return { value: dto };
}

export function validateUpdateUser(payload: any): { value?: UpdateUserDto; error?: string } {
  if (!payload || typeof payload !== 'object') return { error: 'Invalid payload' };
  const dto: UpdateUserDto = {};
  const allowed = ['full_name', 'city', 'last_zakat_date', 'zakat_reminders_enabled', 'campaign_updates_enabled'];
  const keys = Object.keys(payload);
  for (const key of keys) {
    if (!allowed.includes(key)) return { error: `Unexpected field: ${key}` };
  }
  if ('full_name' in payload) {
    if (payload.full_name != null && typeof payload.full_name !== 'string') return { error: 'full_name must be a string' };
    dto.full_name = payload.full_name;
  }
  if ('city' in payload) {
    if (payload.city != null && typeof payload.city !== 'string') return { error: 'city must be a string' };
    dto.city = payload.city;
  }
  if ('last_zakat_date' in payload) {
    const v = payload.last_zakat_date;
    if (v != null && isNaN(new Date(v).getTime())) return { error: 'last_zakat_date must be a valid date' };
    dto.last_zakat_date = v;
  }
  if ('zakat_reminders_enabled' in payload) {
    const v = payload.zakat_reminders_enabled;
    if (v != null && typeof v !== 'boolean') return { error: 'zakat_reminders_enabled must be boolean' };
    dto.zakat_reminders_enabled = v;
  }
  if ('campaign_updates_enabled' in payload) {
    const v = payload.campaign_updates_enabled;
    if (v != null && typeof v !== 'boolean') return { error: 'campaign_updates_enabled must be boolean' };
    dto.campaign_updates_enabled = v;
  }
  return { value: dto };
}


