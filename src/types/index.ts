import type { NextFunction, Request, RequestHandler } from "express";

interface functionReturnObject {
  message?: string;
  status?: number;
  data?: any;
}
export interface functionReturnObjectType {
  error?: functionReturnObject;
  success?: functionReturnObject;
}

export interface sendMailType {
  identifer: string;
  For: "approved" | "rejected" | "approval" | "terminate";
  role?: "Business" | "user";
}

export interface RequestUserToken extends Request {
  token?: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    role: string;
    iat: number;
    exp: number;
  };
  files?: File | any;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export type userModelsNameType = "user" | "admin";

export type middleWareFnType = (req: RequestUserToken, res: Response, next: NextFunction) => void;

export interface selectedImageType {
  name: string;
  size: number;
}


export interface notificationUserType {
  id: string;
  username?: string;
  deviceId : string;
  profile:string
  role: string;
}
export interface notificationPayload {
  title: string;
  body: string;
}