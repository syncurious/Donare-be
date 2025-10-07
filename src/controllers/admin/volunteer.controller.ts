import response from "../../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../../types/index";
import * as AdminVolunteerService from "../../services/admin/volunteer.service";

export const list = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await AdminVolunteerService.list(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


