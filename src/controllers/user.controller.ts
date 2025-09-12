import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import type { CreateUserDto, UpdateUserDto } from '../services/user.service.js';

const service = new UserService();

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: CreateUserDto = req.body;
    const user = await service.create(dto);
    res.status(201).json(mapToResponseDto(user));
  } catch (err) {
    next(err);
  }
}

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await service.findAll();
    res.json(users.map(mapToResponseDto));
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.findOne(req.params.id);
    res.json(mapToResponseDto(user));
  } catch (err) {
    next(err);
  }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.findOne(req.params.id);
    res.json(mapToProfileResponseDto(user));
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: UpdateUserDto = req.body;
    const user = await service.update(req.params.id, dto);
    res.json(mapToResponseDto(user));
  } catch (err) {
    next(err);
  }
}

export async function updatePreferences(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.updatePreferences(req.params.id, req.body);
    res.json(mapToResponseDto(user));
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function mapToResponseDto(user: any) {
  return {
    id: user._id?.toString?.() ?? user.id,
    email: user.email,
    full_name: user.full_name,
    city: user.city,
    last_zakat_date: user.last_zakat_date,
    zakat_reminders_enabled: user.zakat_reminders_enabled,
    campaign_updates_enabled: user.campaign_updates_enabled,
    created_at: user.created_at,
    updated_at: user.updated_at,
    supabase_user_id: user.supabase_user_id,
  };
}

function mapToProfileResponseDto(user: any) {
  return {
    id: user._id?.toString?.() ?? user.id,
    full_name: user.full_name,
    city: user.city,
    last_zakat_date: user.last_zakat_date,
    zakat_reminders_enabled: user.zakat_reminders_enabled,
    campaign_updates_enabled: user.campaign_updates_enabled,
    created_at: user.created_at,
  };
}


