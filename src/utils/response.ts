// -------------------------------------------------

import type { Response } from "express";
import type { functionReturnObjectType } from "../types/index";

// Write Response Function
function writeResponse(res: Response, statusCode: number, msg?: string | any) {
  res.status(statusCode).json({
    status: true,
    code: statusCode,
    message: msg,
  });
}

// -------------------------------------------------
// Write Data Response Function
function writeResponseData(
  res: Response,
  statusCode: number,
  msg?: string,
  data?: any
) {
  res.status(statusCode).json({
    status: true,
    code: statusCode,
    message: msg,
    data: data,
  });
}

// -------------------------------------------------
// Write Error Response Function
function writeResponseError(
  res: Response,
  statusCode: number,
  msg: string,
  err: any
) {
  res.status(statusCode).json({
    status: false,
    code: statusCode,
    message: msg,
    error: err,
  });
}

// -------------------------------------------------
// Success Response Function
function resSuccess(res: Response, msg: string) {
  // Set Default Message
  msg = msg !== undefined ? msg : "Success";

  // Write Response
  writeResponse(res, 200, msg);
}

// -------------------------------------------------
// Success Data Response Function
function resSuccessData(res: Response, data: any) {
  // Write Response
  writeResponseData(res, 200, "Success", data);
}

// -------------------------------------------------
// Created Response Function
function resCreated(res: Response, data: any) {
  // Write Response
  writeResponseData(res, 201, "Created", data);
}

// -------------------------------------------------
// Updated Response Function
function resUpdated(res: Response, data: any) {
  // Write Response
  writeResponseData(res, 200, "Updated", data);
}

// -------------------------------------------------
// Bad Request Response Function
function resBadRequest(res: Response, err: any) {
  // Set Default Message
  err = err !== undefined ? err : "Bad Request";

  // Write Response
  writeResponseError(res, 400, "Bad Request", err);
}

// -------------------------------------------------
// Internal Server Error Response Function
function resInternalError(res: Response, err: any) {
  // Set Default Message
  err = err !== undefined ? err : "Internal Server Error";
  console.error(
    "**************** error message on console ======================================== "
  );
  console.log(err);

  // Write Response
  writeResponseError(res, 500, "Internal Server Error", err);
}

// -------------------------------------------------
// Not Found Response Function
function resNotFound(res: Response, err: any) {
  // Set Default Message
  err = err !== undefined ? err : "Not Found";

  // Write Response
  writeResponseError(res, 404, "Not Found", err);
}

// -------------------------------------------------
// Unauthorized Response Function
function resUnauthorized(res: Response, err: any) {
  // Write Response
  writeResponseError(res, 401, "Unauthorized", err);
}

// -------------------------------------------------
// Authenticate Response Function
function resAuthenticate(res: Response, err: any) {
  res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
  resUnauthorized(res, err);
}

function socketConsole(data: any) {
  console.log(
    "<<<<===== ** SOCKET CONSOLE START ** =====>>>> \n",
    data,
    "\n <<<<===== ** SOCKET CONSOLE END ** =====>>>>"
  );
  // console.log(data);
}
// basic conrollter response
function basicControllerRes(res:Response, result: functionReturnObjectType) {
  if (!result) return resNotFound(res, "Not Found");
  if (result?.error) {
    if (result?.error?.status == 401) return resUnauthorized(res, result.error);
    return resBadRequest(res, result.error);
  }
  if (result?.success) {
    if (result?.success.status == 201) return resCreated(res, result.success);
    if (result.success.data) return resSuccessData(res, result.success?.data);
    return resSuccess(res, result.success?.message || "");
  }
}

// -------------------------------------------------
// Export Module
export default {
  resSuccess,
  socketConsole,
  resSuccessData,
  resCreated,
  resUpdated,
  resBadRequest,
  resInternalError,
  resNotFound,
  resUnauthorized,
  resAuthenticate,
  basicControllerRes,
};
