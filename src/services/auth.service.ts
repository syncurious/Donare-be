import { UserModel } from '../models/User.js';
import { hashPassword } from '../utils/password.js';

export interface SignupDto {
  email: string;
  password: string;
  fullName: string;
  city: string;
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
      full_name: payload.fullName,
      city: payload.city,
      password_hash,
    });
    return { id: user?._id?.toString(), email: user.email, fullName: user.full_name, city: user.city };
  }
}


