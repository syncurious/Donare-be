import response from "../utils/response.js";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index.js";
import * as VolunteerService from "../services/volunteer.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await VolunteerService.register(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await VolunteerService.get(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


