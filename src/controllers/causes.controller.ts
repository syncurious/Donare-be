import response from "../utils/response.js";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index.js";
import * as CausesService from "../services/causes.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await CausesService.create(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await CausesService.getAll(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


