import { UserModel } from "../models/User";
import type { functionReturnObjectType } from "../types/index";
import { comparePassword, hashPassword } from "../utils/password";
import type { Request, Response } from "express";
import tokens from "../utils/token";

export interface SignupDto {
  email: string;
  password: string;
  fullName: string;
  city: string;
  deviceId?: string;
}

export const signup = async (
  req: Request
): Promise<functionReturnObjectType> => {
  const { email, password, full_name, city, device_id } = req.body;
  const exists = await UserModel.findOne({ email }).lean();
  if (exists) {
    return {
      error: {
        status: 409,
        message: "User with this email already exists",
      },
    };
  }
  const password_hash = await hashPassword(password);
  const user = await UserModel.create({
    email,
    full_name,
    city,
    role: "user",
    password_hash,
    device_id,
  });
  const tokenPayload = {
    id: user?._id?.toString(),
    email: user.email,
    fullName: user.full_name,
    city: user.city,
    role: user.role,
    deviceId: user.device_id,
  };
  return {
    success: {
      data: {
        user: tokenPayload,
        token: tokens.generateToken(
          tokenPayload,
          process.env.TOKEN_SECRET || "",
          { expiresIn: "7d" }
        ),
      },
      message: "User created successfully",
      status: 200,
    },
  };
};

export const signin = async (
  req: Request,
  res: Response
): Promise<functionReturnObjectType> => {
  const { email, password, device_id } = req.body;
  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    return {
      error: {
        status: 404,
        message: "User with this email does not exist",
      },
    };
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password_hash || ""
  );
  if (!isPasswordValid) {
    return {
      error: {
        status: 400,
        message: "Invalid password",
      },
    };
  }

  if (device_id) {
    await UserModel.updateOne({ _id: user._id }, { device_id });
    (user as any).device_id = device_id;
  }

  const tokenPayload = {
    id: user._id,
    email: user.email,
    fullName: user.full_name,
    city: user.city,
    role: user.role,
    deviceId: (user as any).device_id,
  };

  const tokenStr = tokens.generateToken(
    tokenPayload,
    process.env.TOKEN_SECRET || "",
    { expiresIn: "7d" }
  );
  return {
    success: {
      data: {
        user: tokenPayload,
        token: tokenStr,
      },
      message: "Login successful",
      status: 200,
    },
  };
};

export const logout = async (
  req: Request
): Promise<functionReturnObjectType> => {
  const { token } = req.body;
  const decoded =
    token && typeof token === "string"
      ? tokens.verifyToken(token, process.env.JWT_SECRET || "")
      : null;
  if (!decoded) {
    return {
      error: {
        status: 401,
        message: "Invalid token",
      },
    };
  }

  return {
    success: {
      message: "Logout successful",
      status: 200,
    },
  };
};

