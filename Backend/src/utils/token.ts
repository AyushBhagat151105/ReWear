import { db } from "@/db";
import { env } from "@/validators/env";
import jwt from "jsonwebtoken";

const generateAccessToken = (id: string, email: string, role: string) => {
  return jwt.sign({ id, email, role }, env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (id: string, email: string, role: string) => {
  return jwt.sign({ id, email, role }, env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const generateAccessAndRefreshToken = async (
  id: string,
  email: string,
  role: string
) => {
  const accessToken = generateAccessToken(id, email, role);
  const refreshToken = generateRefreshToken(id, email, role);

  await db.user.update({
    where: {
      id,
    },
    data: {
      refreshToken,
    },
  });

  return { accessToken, refreshToken };
};
