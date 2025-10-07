import response from "../../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../../types/index";
import * as AdminHelpRequestService from "../../services/admin/helpRequest.service";

export const list = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await AdminHelpRequestService.list(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await AdminHelpRequestService.updateStatus(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


