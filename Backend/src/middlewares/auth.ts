import { ApiError } from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken =
      req.cookies.accessToken ??
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { id: string; email: string; role: string };

    if (!decoded) {
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }

    req.user = decoded;
    next();
  }
);
