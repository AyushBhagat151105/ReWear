import {
  getUser,
  login,
  logout,
  refreshAccessToken,
  register,
  uploadAvatar,
} from "@/controllers/auth.controller";
import { isLoggedIn } from "@/middlewares/auth";
import { upload } from "@/middlewares/multer";
import { Router } from "express";

export const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", isLoggedIn, logout);
AuthRouter.get("/profile", isLoggedIn, getUser);
AuthRouter.post("/upload", isLoggedIn, upload.single("avatar"), uploadAvatar);
AuthRouter.post("/refresh", refreshAccessToken);
