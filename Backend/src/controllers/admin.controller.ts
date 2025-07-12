import { db } from "@/db";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

export const ACCEPTED = asyncHandler(async (req: Request, res: Response) => {});

export const REJECTED = asyncHandler(async (req: Request, res: Response) => {});

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await db.item.findMany();

  if (!items || items.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No approved items found", []));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Approved items found", items));
});
