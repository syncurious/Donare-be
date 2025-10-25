import type { RequestUserToken } from "../types/index";
const { s3UploadObject, s3DeleteObject } = require("../middlewares");

export const uploadFile = async (req: RequestUserToken) => {
  console.log("file => ", req?.files);
  if (!req?.files) return { error: { message: "file is required" } };
  let url = await s3UploadObject(req.files.buffer, req.files.originalname, req.files.mimetype);
  return { success: { data: { url: url?.Location || url } } };
};

export let deleteImage = async (req: RequestUserToken) => {
  let { url, id } = req.body;
  if (!url) return { error: { message: "url is required" } };
  let deleteRes = await s3DeleteObject(url);
  return { success: { data: deleteRes } };
};
