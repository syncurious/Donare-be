import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

const service = new AuthService();

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body || {};
    const email = body.email ?? body.username ?? body.user?.email;
    const password = body.password ?? body.pass;
    const full_name = body.full_name ?? body.name ?? body.full_name;
    const city = body.city ?? body.location?.city ?? body.town;
    const missing: string[] = [];
    if (!email) missing.push('email');
    if (!password) missing.push('password');
    if (!full_name) missing.push('fullName');
    if (!city) missing.push('city');
    const user_preferences = body.user_preferences ?? {
      last_zakat_date: new Date(),
      zakat_reminders_enabled: false,
      campaign_updates_enabled: false,
    };
    if (missing.length) return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` });
    const result = await service.signup({ email, password, full_name, city, user_preferences });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
    const result = await service.signin({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
}


