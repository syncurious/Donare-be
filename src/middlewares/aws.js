const multer = require("multer");
const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: process.env.S3_REGION
})

const s3 = new aws.S3();

let memoryStorage = multer.memoryStorage();
let uploadbuffer = multer({ storage: memoryStorage });

const s3DeleteObject = async (url) => {

  if (!url) {
    return res.status(400).json({ error: "fileUrl is required" });
  }

  try {
    // Parse S3 URL
    const { bucketName, key } = parseS3Url(url);
    console.log("bucketName", bucketName, "key", key)

    // Delete the object
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    await s3.deleteObject(params).promise();

    return ({ message: "File deleted successfully", url });
  } catch (error) {
    console.error("Error deleting file:", error);
    return ({ error: "Failed to delete file", details: error });
  }
}

const s3UploadObject = async (buffer, filename, mimetype) => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME is not defined in environment variables');
  }
  let dateparam = new Date();
  let path = `files/${dateparam.getTime()}_${filename}`
  let putObject = {
    Bucket: process.env.S3_BUCKET_NAME,
    Body: buffer,
    Key: path,
    contentType: mimetype
  }
  let awslink = await s3.upload(putObject).promise()
  console.log("S3 middleware ------------------------------------ ", awslink)
  return awslink
}


export default { uploadbuffer, s3UploadObject, s3DeleteObject };