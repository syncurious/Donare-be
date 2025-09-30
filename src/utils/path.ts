import path from "path";

let rootDir = process.cwd() || path.resolve(__dirname, "../../");
let publicDir = path.join(rootDir, "public");
let uploadsDir = path.join(publicDir, "uploads");
let srcDir = path.join(rootDir, "src");
let mailsDir = path.join(srcDir, "view/mails");
let mailVerificationFile = path.join(mailsDir, "verification/index.ejs");
let mailForgetPasswordFile = path.join(mailsDir, "forgetPassword/index.ejs");
let mailContactFile = path.join(mailsDir, "contact/index.ejs");

export let paths = {
  rootDir,
  publicDir,
  uploadsDir,
  srcDir,
  mailsDir,
  mailVerificationFile,
  mailForgetPasswordFile,
  mailContactFile,
};
