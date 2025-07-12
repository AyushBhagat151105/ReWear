import {
  ACCEPTED,
  getAllItems,
  REJECTED,
} from "@/controllers/admin.controller";
import { authorizeAdmin } from "@/middlewares/admin";
import { isLoggedIn } from "@/middlewares/auth";
import { Router } from "express";

export const AdminRouter = Router();

AdminRouter.use(isLoggedIn);
AdminRouter.use(authorizeAdmin);

AdminRouter.put("/accept/:id", ACCEPTED);
AdminRouter.put("/reject/:id", REJECTED);
AdminRouter.get("/", getAllItems);
