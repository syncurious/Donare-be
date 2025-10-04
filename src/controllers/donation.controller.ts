import response from "../utils/response.js";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index";
import * as DonationService from "../services/donation.service";

export const createZakat = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await DonationService.createZakat(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const createFitrah = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await DonationService.createFitrah(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const createSadaqah = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await DonationService.createSadaqah(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const createOther = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await DonationService.createOther(req);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};
