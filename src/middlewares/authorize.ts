import type { Request, Response, NextFunction } from "express";
import response from "../utils/response";

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = (req as any)?.user?.role;
      if (!userRole) return response.resUnauthorized(res, "Unauthorized");
      if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) return next();
      return response.resUnauthorized(res, "Forbidden: insufficient privileges");
    } catch (err) {
      return response.resInternalError(res, err);
    }
  };
}


