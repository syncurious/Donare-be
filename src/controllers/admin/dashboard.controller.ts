import response from "../../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../../types/index";
import * as DashboardService from "../../services/admin/dashboard.service";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await DashboardService.getDashboardStats(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};