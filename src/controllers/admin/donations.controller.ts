import response from "../../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../../types/index";
import * as AdminDonationsService from "../../services/admin/donations.service";

export const list = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await AdminDonationsService.list(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await AdminDonationsService.getById(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


