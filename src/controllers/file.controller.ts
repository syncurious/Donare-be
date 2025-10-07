import response from "../utils/response";
import type { Request, Response } from "express";
import type { functionReturnObjectType, RequestUserToken } from "../types/index";
import * as UploadService from "../services/file.service";

export const upload = async (req: Request, res: Response) => {
  try {
    const result: functionReturnObjectType = await UploadService.uploadFile(req as RequestUserToken);
    return response.basicControllerRes(res, result);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};


