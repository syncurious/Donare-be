import { UserModel } from "../models/User.js";
import type { functionReturnObjectType } from "../types/index.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import type { Request, Response } from "express";
import tokens from "../utils/token";

export interface SignupDto {
  email: string;
  password: string;
  fullName: string;
  city: string;
}

export const signup = async (
  req: Request
): Promise<functionReturnObjectType> => {
  const { email, password, full_name, city } = req.body;
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
    email: email,
    full_name: full_name,
    city: city,
    password_hash,
  });
  return {
    success: {
      data: {
        user: {
          id: user?._id?.toString(),
          email: user.email,
          fullName: user.full_name,
          city: user.city,
        },
        token: tokens.generateToken(
          {
            id: user?._id?.toString(),
            email: user.email,
            fullName: user.full_name,
            city: user.city,
          },
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
  const { email, password } = req.body;
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

  const tokenStr = tokens.generateToken(
    {
      id: user._id,
      email: user.email,
      fullName: user.full_name,
      city: user.city,
    },
    process.env.TOKEN_SECRET || "",
    { expiresIn: "7d" }
  );
  return {
    success: {
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.full_name,
          city: user.city,
        },
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
