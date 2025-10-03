import response from "../utils/response.js";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index";
import * as UserService from "../services/user.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await UserService.getProfile(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const getPreferences = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await UserService.getPreferences(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await UserService.updateProfile(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await UserService.updatePreferences(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


