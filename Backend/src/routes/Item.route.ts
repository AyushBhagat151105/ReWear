import {
  createItem,
  getAllItems,
  getItem,
} from "@/controllers/Item.controller";
import { upload } from "@/middlewares/multer";
import { Router } from "express";

export const ItemRouter = Router();

ItemRouter.get("/", getAllItems);
ItemRouter.get("/:id", getItem);
ItemRouter.post("/create", upload.array("images", 5), createItem);
