import { db } from "@/db";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { itemStatusEnum } from "@/utils/constants";
import { Request, Response } from "express";

export const ACCEPTED = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await db.item.update({
    where: {
      id,
      status: itemStatusEnum.PENDING,
    },
    data: {
      status: itemStatusEnum.APPROVED,
    },
  });

  if (!item) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "Item not found or it has been already updated",
          {}
        )
      );
  }

  return res.status(200).json(new ApiResponse(200, "Item approved", item));
});

export const REJECTED = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await db.item.update({
    where: {
      id,
      status: itemStatusEnum.PENDING,
    },
    data: {
      status: itemStatusEnum.REJECTED,
    },
  });

  if (!item) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "Item not found or it has been already updated",
          {}
        )
      );
  }

  return res.status(200).json(new ApiResponse(200, "Item rejected", item));
});

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await db.item.findMany({
    where: {
      status: itemStatusEnum.PENDING,
    },
  });

  if (!items || items.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No approved items found", []));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Approved items found", items));
});
