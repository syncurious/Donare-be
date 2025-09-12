import type { Request, Response, NextFunction } from 'express';

type Validator<T> = (payload: any) => { value?: T; error?: string };

export function validateBody<T>(validator: Validator<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validator(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    req.body = value as any;
    next();
  };
}


