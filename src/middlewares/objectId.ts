import type { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

export function validateObjectIdParam(paramName = 'id') {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    if (!isValidObjectId(value)) {
      return res.status(400).json({ message: `Invalid ${paramName} format` });
    }
    next();
  };
}



