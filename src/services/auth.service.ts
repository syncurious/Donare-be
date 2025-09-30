import { UserModel } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signToken } from '../middlewares/auth.js';

export interface SignupDto {
  email: string;
  password: string;
  full_name: string;
  city: string;
  user_preferences: {
    last_zakat_date: string | Date;
    zakat_reminders_enabled: boolean;
    campaign_updates_enabled: boolean;
  };
}

export interface SigninDto {
  email: string;
  password: string;
}

export class AuthService {
  async signup(payload: SignupDto) {
    const exists = await UserModel.findOne({ email: payload.email }).lean();
    if (exists) {
      const error: any = new Error('User with this email already exists');
      error.status = 409;
      throw error;
    }
    const password_hash = await hashPassword(payload.password);
    const user = await UserModel.create({
      email: payload.email,
      full_name: payload.full_name,
      city: payload.city,
      password_hash,
    });

    if (!user?.id) {
      const error: any = new Error('User not created');
      error.status = 500;
      throw error;
    }
    const token = signToken({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, full_name: user.full_name } };
  }

  async signin(payload: SigninDto) {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user || !user.password_hash) {
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const ok = await comparePassword(payload.password, user.password_hash);
    if (!ok) {
      const error: any = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const token = signToken({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, full_name: user.full_name } };
  }
}



