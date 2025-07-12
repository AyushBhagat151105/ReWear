import {
  ACCEPTED,
  getAllItems,
  REJECTED,
} from "@/controllers/admin.controller";
import { Router } from "express";

export const AdminRouter = Router();

AdminRouter.put("/accept/:id", ACCEPTED);
AdminRouter.put("/reject/:id", REJECTED);
AdminRouter.get("/", getAllItems);
