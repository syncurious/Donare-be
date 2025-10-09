import type { RequestUserToken } from "../types/index";
import type { functionReturnObjectType } from "../types/index";
// const aws = require("../middlewares/aws.js");
import aws from "../middlewares/aws";

export const uploadFile = async (
  req: RequestUserToken
): Promise<functionReturnObjectType> => {
  try {
    if (!req?.file) {
      return { error: { status: 400, message: "file is required" } } as any;
    }
    const url = await aws.s3UploadObject(
      (req.file as any).buffer,
      (req.file as any).originalname,
      (req.file as any).mimetype
    );
    const link = (url as any)?.Location || url;
    return { success: { status: 200, message: "Uploaded", data: { url: link } } };
  } catch (error) {
    return { error: { status: 500, message: "Upload failed", data: error } } as any;
  }
};


