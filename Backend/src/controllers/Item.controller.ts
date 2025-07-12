import { db } from "@/db";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { itemStatusEnum } from "@/utils/constants";
import { validateSchema } from "@/utils/validateSchema";
import { itemCreateSchema } from "@/validators/zod";
import { Request, Response } from "express";

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const result = validateSchema(itemCreateSchema, req.body);

  if (!result.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid input", result.error));
  }

  const files = req.files as Express.Multer.File[];

  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      return result
        ? { url: result.secure_url, urlId: result.public_id }
        : null;
    })
  );

  const validImages = uploadedImages.filter(Boolean) as {
    url: string;
    urlId: string;
  }[];

  if (validImages.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Image upload failed", {}));
  }

  const item = await db.item.create({
    data: {
      ...result.data,
      image: {
        create: validImages,
      },
    },
    include: {
      image: true,
    },
  });

  return res.status(201).json(new ApiResponse(201, "Item created", item));
});

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await db.item.findMany({
    where: {
      status: itemStatusEnum.APPROVED,
    },
    include: {
      image: true,
    },
  });

  if (!items)
    return res.status(404).json(new ApiResponse(404, "Items not found", {}));

  return res.status(200).json(new ApiResponse(200, "Items found", items));
});

export const getItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.query;

  let item;

  if (id) {
    item = await db.item.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        size: true,
        isAvailable: true,
        status: true,
        point: true,
        userid: true,
        condition: true,
        createdAt: true,
        updatedAt: true,
        image: true,
      },
    });
  } else if (name) {
    item = await db.item.findFirst({
      where: {
        title: {
          contains: String(name),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        size: true,
        isAvailable: true,
        status: true,
        point: true,
        userid: true,
        condition: true,
        createdAt: true,
        updatedAt: true,
        image: true,
      },
    });
  }

  if (!item || item.status !== itemStatusEnum.APPROVED) {
    return res.status(404).json(new ApiResponse(404, "Item not found", {}));
  }

  return res.status(200).json(new ApiResponse(200, "Item found", item));
});

export const getUsersItem = asyncHandler(
  async (req: Request, res: Response) => {
    const items = await db.item.findMany();

    if (!items)
      return res.status(404).json(new ApiResponse(404, "Items not found", {}));

    return res.status(200).json(new ApiResponse(200, "Items found", items));
  }
);
