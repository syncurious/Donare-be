import jwt from "jsonwebtoken";

const generateToken = (payload: string | Buffer | object, secretOrPrivateKey: jwt.Secret | jwt.PrivateKey, options?: jwt.SignOptions) => {
  const token = jwt.sign(payload, secretOrPrivateKey, options);
  return token;
};

const verifyToken = (token: string, secret: string) => {
  const payload = jwt.verify(token, secret);
  if (!payload) {
    return null;
  }
  return payload;
};

export default {
    generateToken,
    verifyToken,
};