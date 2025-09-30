const { AuthenticateToken } = require("../helper/validation");
const multer = require("multer");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const { default: user } = require("../model/user");
const { resUnauthorized } = require("../helper/respones");

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: process.env.S3_REGION
})


const isAuthFeature = async (req, res, next) => {
  try {
    console.log("middle ware", req.user)
    const Ur = await user.findOne({ _id: req.user.id }, { isInAnySubs: 1, isSubscribed: 1 })
    if (!Ur?.isSubscribed) {
      return resUnauthorized(res, { message: 'You are not authorized to access this feature. Please subscribe to a plan to access this feature.' });
    }
    return next();
  } catch (err) {
    console.log("middle ware", err)
    return res.status(400).json({ error: "Invalid user" });
  }
}

const s3 = new aws.S3();

const verifyUser = (req, res, next) => {
  return AuthenticateToken(req, res, next, process.env.userLoginToken);
};

const verifyAdmin = (req, res, next) => {
  return AuthenticateToken(req, res, next, process.env.adminLoginToken);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("uploads", file);
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    console.log("uploads", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

let memoryStorage = multer.memoryStorage();
let uploadbuffer = multer({ storage: memoryStorage });

function parseS3Url(s3Url) {
  const url = new URL(s3Url);

  if (!url.host.endsWith(".amazonaws.com")) {
    throw new Error("Invalid S3 URL");
  }

  // Extract bucket name
  const bucketName = url.host.split(".s3")[0];

  // Extract the object key (file path)
  const key = decodeURIComponent(url.pathname.slice(1));

  return { bucketName, key };
}

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



module.exports = {
  verifyUser,
  verifyAdmin,
  upload,
  uploadbuffer,
  s3UploadObject,
  s3DeleteObject,
  isAuthFeature
};
