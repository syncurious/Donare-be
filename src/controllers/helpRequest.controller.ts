import response from "../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index";
import * as HelpRequestService from "../services/helpRequest.service";

export const create = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await HelpRequestService.create(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await HelpRequestService.getAll(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


