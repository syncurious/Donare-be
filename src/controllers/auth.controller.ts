import response from "../utils/response.js";
import type { Request, Response } from "express";
import type { functionReturnObjectType } from "../types/index.js";
import * as AuthService  from "../services/auth.service.js";

import type { RequestUserToken } from "../types/index.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    let user: functionReturnObjectType = await AuthService.signup(req);
    return  response.basicControllerRes(res, user);

  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let user = await AuthService.signin(req, res);
    return response.basicControllerRes(res, user);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};

export const logout = async (req: RequestUserToken, res: Response) => {
  try {
    let user = await AuthService.logout(req);
    return response.basicControllerRes(res, user);
  } catch (error) {
    console.log(error);
    return response.resInternalError(res, error);
  }
};
