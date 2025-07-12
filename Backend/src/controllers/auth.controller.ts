import { db } from "@/db";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { cookieOptions } from "@/utils/constants";
import { comparePassword, hashPassword } from "@/utils/hash";
import { generateAccessAndRefreshToken } from "@/utils/token";
import { validateSchema } from "@/utils/validateSchema";
import { loginUserSchema, registerUserSchema } from "@/validators/zod";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = validateSchema(registerUserSchema, req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid input", result.error));
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (existingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User already exists", {}));
  }

  const hashedPassword = await hashPassword(result.data.password);

  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
    user.email,
    user.role
  );

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, "User created", user));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = validateSchema(loginUserSchema, req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid input", result.error));
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid credentials", {}));
  }

  const isMatch = await comparePassword(result.data.password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid credentials", {}));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
    user.email,
    user.role
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, "User logged in", user));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const user = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });

  return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "User logged out", user));
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found", {}));
  }

  return res.status(200).json(new ApiResponse(200, "User found", user));
});

export const uploadAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json(new ApiResponse(400, "No file uploaded", {}));
    }

    const result = await uploadOnCloudinary(file.path);

    if (!result) {
      return res
        .status(400)
        .json(new ApiResponse(400, "File upload failed", {}));
    }

    const user = await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: result.secure_url,
      },
    });

    return res.status(200).json(new ApiResponse(200, "Avatar uploaded", user));
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies.refreshToken ??
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!incomingRefreshToken) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", {}));
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { id: string; email: string; role: string };

    if (!decoded) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", {}));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      decoded.id,
      decoded.email,
      decoded.role
    );

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new ApiResponse(200, "Access token refreshed", {}));
  }
);
